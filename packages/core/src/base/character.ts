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

import { Aura } from "@gi-tcg/typings";
import { TriggeredSkillDefinition, InitiativeSkillDefinition } from "./skill";

export type ElementTag =
  | "cryo"
  | "hydro"
  | "pyro"
  | "electro"
  | "anemo"
  | "geo"
  | "dendro";

export type WeaponTag =
  | "sword"
  | "claymore"
  | "pole"
  | "catalyst"
  | "bow"
  | "other";

export type NationTag =
  | "mondstadt"
  | "liyue"
  | "inazuma"
  | "sumeru"
  | "fontaine"
  | "fatui"
  | "eremite"
  | "monster"
  | "hilichurl";

export type ArkheTag =
  | "pneuma" // 芒
  | "ousia"; // 荒

export type CharacterTag = ElementTag | WeaponTag | NationTag | ArkheTag;

export interface CharacterDefinition {
  readonly __definition: "characters";
  readonly type: "character";
  readonly id: number;
  readonly tags: readonly CharacterTag[];
  readonly constants: CharacterConstants;
  readonly initiativeSkills: readonly InitiativeSkillDefinition[];
  readonly skills: readonly TriggeredSkillDefinition[];
}

export interface CharacterVariables {
  readonly health: number;
  readonly energy: number;
  readonly aura: Aura;
  readonly alive: 0 | 1;
  readonly [key: string]: number;
}

export interface CharacterConstants extends CharacterVariables {
  readonly maxHealth: number;
  readonly maxEnergy: number;
}
