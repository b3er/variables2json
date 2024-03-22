import {
  AppState,
  Collection,
  ColorFormatType,
  TokenType,
  VariableToken,
  VariableValue
} from "./models";

import axios from 'axios';
import { useStore } from './store';

function _convertedValue(
  format: ColorFormatType,
  type: TokenType,
  value: any
): any {
  if (type == TokenType.Color && format == ColorFormatType.Hex) {
    // convert r, g, b, a to hex

    let hex = (
      value.r.toString(16).padStart(2, "0") +
      value.g.toString(16).padStart(2, "0") +
      value.b.toString(16).padStart(2, "0")
    ).toUpperCase();

    let alpha = Math.round(value.a * 255)
      .toString(16)
      .padStart(2, "0")
      .toUpperCase();

    return "#" + hex + (alpha == "FF" ? "" : alpha);
  }

  return value;
}

export function jsonFromState(state: AppState): string {
  let skipPrivate = state.settings.excludePrivate;
  let colorFormat = state.settings.colorFormat;

  console.log(colorFormat);

  let output = new Array<Collection>();
  let variables = state.variables;

  for (let variableProxy of variables) {
    let variable = VariableToken.fromObject(variableProxy);
    let collection = output.find((c) => c.name == variable.collection);

    if (skipPrivate && variable.isPrivate()) continue;

    if (collection == undefined) {
      collection = {
        name: variable.collection,
        modes: []
      } as Collection;

      output.push(collection);
    }

    for (let value of variable.values) {
      let mode = collection?.modes.find((m) => m.name == value.modeName);

      let tokenValue = {
        name: variable.name,
        type: variable.type,
        isAlias: value.isAlias,
        value: value.isAlias
          ? value.value
          : _convertedValue(colorFormat, variable.type, value.value)
      } as VariableValue;

      if (mode != undefined) {
        mode.variables.push(tokenValue);
      } else {
        collection?.modes.push({
          name: value.modeName,
          variables: [tokenValue]
        });
      }
    }
  }

  return JSON.stringify(
    {
      version: state.version,
      metadata: {},
      collections: output
    },
    null,
    2
  );
}

export const uuid = (a: string = ""): string =>
  a
    ? /* eslint-disable no-bitwise */
      ((Number(a) ^ (Math.random() * 16)) >> (Number(a) / 4)).toString(16)
    : `${1e7}-${1e3}-${4e3}-${8e3}-${1e11}`.replace(/[018]/g, uuid);

export async function createPR(repo: string, json: string , githubToken: string) {
  const owner = repo.split('/')[0];
  const repoName = repo.split('/')[1];
  
  const githubApi = axios.create({
    baseURL: 'https://api.github.com',
    headers: {
      Authorization: `token ${githubToken}`,
    },
  });
  // Get the SHA of the latest commit on the master branch
  const { data: baseCommit } = await githubApi.get(`/repos/${repo}/git/refs/heads/master`);

  // Get the tree of the latest commit
  const { data: baseTree } = await githubApi.get(`/repos/${repo}/git/trees/${baseCommit.object.sha}`);

  // Create blob for JSON file
  const blob = await githubApi.post(`/repos/${repo}/git/blobs`, {
    content: btoa(json),
    encoding: 'base64',
  });

  // Create tree with blob
  const tree = await githubApi.post(`/repos/${repo}/git/trees`, {
    base_tree: baseTree.sha,
    tree: [
      {
        path: 'variables.json',
        mode: '100644',
        type: 'blob',
        sha: blob.data.sha,
      },
    ],
  });

  // Create commit with tree
  const commit = await githubApi.post(`/repos/${repo}/git/commits`, {
    message: 'Add variables.json',
    tree: tree.data.sha,
    owner: owner,
    parents: [baseCommit.object.sha],
  });


  // Create a new branch
  const branchName = 'newVariables-' + Date.now();
    await githubApi.post(`/repos/${repo}/git/refs`, {
    ref: 'refs/heads/' + branchName, 
    sha: commit.data.sha,
    });

  // Create PR
  const pr = await githubApi.post(`/repos/${repo}/pulls`, {
    title: 'Add variables.json',
    head: `${owner}:${branchName}`,
    body: 'Please pull these awesome changes in!',
    base: 'master',
    owner: owner,
    repo: repoName,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  });
  return pr.data;
}



    