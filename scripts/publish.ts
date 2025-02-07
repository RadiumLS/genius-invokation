#!/usr/bin/env bun
// Copyright (C) 2024 Guyutongxue
// 
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
// 
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

/**
 * This file tries to publish all publish-able packages.
 */

import { $ } from "bun";
import { existsSync } from "node:fs";
import { PackageJson } from "type-fest";

$.throws(true);

const packages = ["typings", "utils", "core", "data", "webui-core", "webui"];
const VERSION = "0.1.6";

interface PackageInfo {
  directory: string;
  packageJson: PackageJson;
}

const packageInfos: PackageInfo[] = [];

function transferWorkspaceDeps(deps: Partial<Record<string, string>> = {}) {
  for (const [key, value] of Object.entries(deps)) {
    if (value?.startsWith("workspace:")) {
      const foundDep = packageInfos.find((info) => info.packageJson.name === key);
      if (!foundDep) {
        throw new Error(`Workspace dependency not found: ${key}`);
      }
      deps[key] = foundDep.packageJson.version;
    }
  }
}

for (const pkg of packages) {
  console.log(`Building and verifying package: ${pkg}`);
  const directory = `packages/${pkg}`;
  if (!existsSync(directory)) {
    throw new Error(`Package directory not found: ${directory}`);
  }
  const packageJson: PackageJson = await Bun.file(`${directory}/package.json`).json();
  if ("build" in (packageJson.scripts ?? {})) {
    await $`bun run build`.cwd(directory).quiet();
  }
  if ("build:publish" in (packageJson.scripts ?? {})) {
    await $`bun run build:publish`.cwd(directory).quiet();
  }
  if ("exports:publish" in packageJson) {
    packageJson.exports = packageJson["exports:publish"] as any;
    delete packageJson["exports:publish"];
  }
  if (!packageJson.dependencies) {
    packageJson.dependencies = {};
  }
  transferWorkspaceDeps(packageJson.dependencies);
  transferWorkspaceDeps(packageJson.peerDependencies);
  if (packageJson.devDependencies) {
    delete packageJson.devDependencies;
  }
  packageJson.repository = "github:Guyutongxue/genius-invokation";
  packageJson.license = "AGPL-3.0-or-later";
  packageInfos.push({ directory, packageJson });
  if (!existsSync(`${directory}/dist`)) {
    throw new Error(`Package dist directory not found: ${directory}`);
  }
  if (!existsSync(`${directory}/README.md`)) {
    throw new Error(`Package README.md not found: ${directory}`);
  }
}

const publishDir = "temp";
const licensePath = "LICENSE";

for (const { packageJson, directory } of packageInfos) {
  const { name, version } = packageJson;
  console.log(`Publishing package: ${name}`);
  if (!version?.startsWith(VERSION)) {
    throw new Error(`Version not starts with ${VERSION}: ${name}`);
  }
  await $`rm -rf ${publishDir}`.quiet();
  await $`mkdir -p ${publishDir}`.quiet();
  await $`cp -r ${directory}/dist ${publishDir}/`.quiet();
  await $`echo ${JSON.stringify(packageJson, void 0, 2)} > ${publishDir}/package.json`.quiet();
  await $`cp ${directory}/README.md ${publishDir}/`.quiet();
  await $`cp ${licensePath} ${publishDir}/`.quiet();
  // Bro attw is so strict
  await $`bunx --bun attw --pack ${publishDir}`.nothrow();
  await $`npm publish --access public`.cwd(publishDir);
}
