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

import { character, skill, status, card, DamageType } from "@gi-tcg/core/builder";

/**
 * @id 122052
 * @name 水泡围困
 * @description
 * 角色无法使用技能。（持续到回合结束）
 */
export const MistBubblePrison = status(122052)
  .since("v5.0.0")
  // TODO
  .done();

/**
 * @id 122053
 * @name 水泡封锁（准备中）
 * @description
 * 本角色将在下次行动时，直接使用技能：水泡封锁。
 */
export const MistBubbleLockdownPreparing = status(122053)
  .since("v5.0.0")
  // TODO
  .done();

/**
 * @id 22051
 * @name 镰刀旋斩
 * @description
 * 造成2点物理伤害。
 */
export const WhirlingScythe = skill(22051)
  .type("normal")
  .costHydro(1)
  .costVoid(2)
  // TODO
  .done();

/**
 * @id 22052
 * @name 狂澜镰击
 * @description
 * 造成3点水元素伤害。
 * 如果有敌方角色附属有冻结或水泡围困，则本角色获得1点充能。（每回合1次）
 */
export const SlashOfSurgingTides = skill(22052)
  .type("elemental")
  .costHydro(3)
  // TODO
  .done();

/**
 * @id 22053
 * @name 浮泡攻势
 * @description
 * 造成3点水元素伤害，生成手牌水泡史莱姆。
 * （装备有水泡史莱姆的角色可以使用特技：水泡战法）
 */
export const BubblefloatBlitz = skill(22053)
  .type("burst")
  .costHydro(3)
  .costEnergy(2)
  // TODO
  .done();

/**
 * @id 22054
 * @name 狂澜镰击
 * @description
 * 
 */
export const SlashOfSurgingTidesPassive = skill(22054)
  .type("passive")
  // TODO
  .done();

/**
 * @id 2205
 * @name 丘丘水行游侠
 * @description
 * 不属于任何部族的丘丘人流浪者，如同自我流放一般在荒野中四处漫游。
 */
export const HydroHilichurlRogue = character(2205)
  .since("v5.0.0")
  .tags("hydro", "monster", "hilichurl")
  .health(10)
  .energy(2)
  .skills(WhirlingScythe, SlashOfSurgingTides, BubblefloatBlitz, SlashOfSurgingTidesPassive)
  .done();

/**
 * @id 222051
 * @name 轻盈水沫
 * @description
 * 战斗行动：我方出战角色为丘丘水行游侠时，装备此牌。
 * 丘丘水行游侠装备此牌后，立刻使用一次狂澜镰击。
 * 装备有此牌的丘丘水行游侠在场，我方使用「特技」时：少花费1个元素骰。（每回合1次）
 * （牌组中包含丘丘水行游侠，才能加入牌组）
 */
export const FeatherweightFoam = card(222051)
  .since("v5.0.0")
  .costHydro(3)
  .talent(HydroHilichurlRogue)
  // TODO
  .done();
