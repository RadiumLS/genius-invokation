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

import { CardHandle, DamageType, DiceType, card, combatStatus, summon } from "@gi-tcg/core/builder";

/**
 * @id 303211
 * @name 冰箭丘丘人
 * @description
 * 结束阶段：造成1点冰元素伤害。
 * 可用次数：2
 */
export const CryoHilichurlShooter = summon(303211)
  .endPhaseDamage(DamageType.Cryo, 1)
  .usage(2)
  .done();

/**
 * @id 303212
 * @name 水丘丘萨满
 * @description
 * 结束阶段：造成1点水元素伤害。
 * 可用次数：2
 */
export const HydroSamachurl = summon(303212)
  .endPhaseDamage(DamageType.Hydro, 1)
  .usage(2)
  .done();


/**
 * @id 303213
 * @name 冲锋丘丘人
 * @description
 * 结束阶段：造成1点火元素伤害。
 * 可用次数：2
 */
export const HilichurlBerserker = summon(303213)
  .endPhaseDamage(DamageType.Pyro, 1)
  .usage(2)
  .done();

/**
 * @id 303214
 * @name 雷箭丘丘人
 * @description
 * 结束阶段：造成1点雷元素伤害。
 * 可用次数：2
 */
export const ElectroHilichurlShooter = summon(303214)
  .endPhaseDamage(DamageType.Electro, 1)
  .usage(2)
  .done();

/**
 * @id 303216
 * @name 愚人众伏兵·冰萤术士
 * @description
 * 所在阵营的角色使用技能后：对所在阵营的出战角色造成1点冰元素伤害。（每回合1次）
 * 可用次数：2
 */
export const FatuiAmbusherCryoCicinMage = combatStatus(303216)
  .tags("debuff")
  .on("useSkill")
  .usage(2)
  .damage(DamageType.Cryo, 1, "my active")
  .done();

/**
 * @id 303217
 * @name 愚人众伏兵·藏镜仕女
 * @description
 * 所在阵营的角色使用技能后：对所在阵营的出战角色造成1点水元素伤害。（每回合1次）
 * 可用次数：2
 */
export const FatuiAmbusherMirrorMaiden = combatStatus(303217)
  .tags("debuff")
  .on("useSkill")
  .usage(2)
  .damage(DamageType.Hydro, 1, "my active")
  .done();

/**
 * @id 303218
 * @name 愚人众伏兵·火铳游击兵
 * @description
 * 所在阵营的角色使用技能后：对所在阵营的出战角色造成1点火元素伤害。（每回合1次）
 * 可用次数：2
 */
export const FatuiAmbusherPyroslingerBracer = combatStatus(303218)
  .tags("debuff")
  .on("useSkill")
  .usage(2)
  .damage(DamageType.Pyro, 1, "my active")
  .done();

/**
 * @id 303219
 * @name 愚人众伏兵·雷锤前锋军
 * @description
 * 所在阵营的角色使用技能后：对所在阵营的出战角色造成1点雷元素伤害。（每回合1次）
 * 可用次数：2
 */
export const FatuiAmbusherElectrohammerVanguard = combatStatus(303219)
  .tags("debuff")
  .on("useSkill")
  .usage(2)
  .damage(DamageType.Electro, 1, "my active")
  .done();

/**
 * @id 331102
 * @name 元素共鸣：粉碎之冰
 * @description
 * 本回合中，我方当前出战角色下一次造成的伤害+2。
 * （牌组包含至少2个冰元素角色，才能加入牌组）
 */
export const ElementalResonanceShatteringIce = card(331102)
  .costCryo(1)
  .tags("resonance")
  .requireCharacterTag("cryo")
  .toStatus("my active", 303112)
  .oneDuration()
  .once("modifySkillDamage")
  .increaseDamage(2)
  .done();

/**
 * @id 331202
 * @name 元素共鸣：愈疗之水
 * @description
 * 治疗我方出战角色2点。然后，治疗所有我方后台角色1点。
 * （牌组包含至少2个水元素角色，才能加入牌组）
 */
export const ElementalResonanceSoothingWater = card(331202)
  .costHydro(1)
  .tags("resonance")
  .requireCharacterTag("hydro")
  .heal(2, "my active")
  .heal(1, "my standby")
  .done();

/**
 * @id 331302
 * @name 元素共鸣：热诚之火
 * @description
 * 本回合中，我方当前出战角色下一次引发火元素相关反应时，造成的伤害+3。
 * （牌组包含至少2个火元素角色，才能加入牌组）
 */
export const ElementalResonanceFerventFlames = card(331302)
  .costPyro(1)
  .tags("resonance")
  .requireCharacterTag("pyro")
  .toStatus("my active", 303132)
  .oneDuration()
  .once("modifySkillDamage", (c, e) => e.isReactionRelatedTo(DamageType.Pyro))
  .increaseDamage(3)
  .done();

/**
 * @id 331402
 * @name 元素共鸣：强能之雷
 * @description
 * 我方一名充能未满的角色获得1点充能。（出战角色优先）
 * （牌组包含至少2个雷元素角色，才能加入牌组）
 */
export const ElementalResonanceHighVoltage = card(331402)
  .costElectro(1)
  .tags("resonance")
  .requireCharacterTag("electro")
  .gainEnergy(1, "my character with energy < maxEnergy limit 1")
  .done();

/**
 * @id 331502
 * @name 元素共鸣：迅捷之风
 * @description
 * 切换到目标角色，并生成1点万能元素。
 * （牌组包含至少2个风元素角色，才能加入牌组）
 */
export const ElementalResonanceImpetuousWinds = card(331502)
  .costAnemo(1)
  .tags("resonance")
  .addTarget("my character")
  .switchActive("@targets.0")
  .generateDice(DiceType.Omni, 1)
  .done();

/**
 * @id 331602
 * @name 元素共鸣：坚定之岩
 * @description
 * 本回合中，我方角色下一次造成岩元素伤害后：如果我方存在提供「护盾」的出战状态，则为一个此类出战状态补充3点「护盾」。
 * （牌组包含至少2个岩元素角色，才能加入牌组）
 */
export const ElementalResonanceEnduringRock = card(331602)
  .costGeo(1)
  .tags("resonance")
  .requireCharacterTag("geo")
  .toCombatStatus(303162)
  .oneDuration()
  .once("dealDamage", (c, e) => e.source.definition.type === "character" && e.type === DamageType.Geo)
  .do((c) => {
    c.$("my combat statuses with tag (shield) limit 1")?.addVariable("shield", 3);
    return true;
  })
  .done();

/**
 * @id 331702
 * @name 元素共鸣：蔓生之草
 * @description
 * 本回合中，我方下一次引发元素反应时，造成的伤害+2。
 * 使我方场上的燃烧烈焰、草原核和激化领域「可用次数」+1。
 * （牌组包含至少2个草元素角色，才能加入牌组）
 */
export const ElementalResonanceSprawlingGreenery = card(331702)
  .costDendro(1)
  .tags("resonance")
  .requireCharacterTag("dendro")
  .do((c) => {
    c.$("my summon with definition id 115")?.addVariable("usage", 1);
    c.$("my combat statuses with definition id 116")?.addVariable("usage", 1);
    c.$("my combat statuses with definition id 117")?.addVariable("usage", 1);
  })
  .toCombatStatus(303172)
  .oneDuration()
  .once("modifyDamage", (c, e) => e.getReaction())
  .increaseDamage(2)
  .done();

/**
 * @id 331101
 * @name 元素共鸣：交织之冰
 * @description
 * 生成1个冰元素骰。
 * （牌组包含至少2个冰元素角色，才能加入牌组）
 */
export const ElementalResonanceWovenIce = card(331101)
  .tags("resonance")
  .requireCharacterTag("cryo")
  .generateDice(DiceType.Cryo, 1)
  .done();

/**
 * @id 331201
 * @name 元素共鸣：交织之水
 * @description
 * 生成1个水元素骰。
 * （牌组包含至少2个水元素角色，才能加入牌组）
 */
export const ElementalResonanceWovenWaters = card(331201)
  .tags("resonance")
  .requireCharacterTag("hydro")
  .generateDice(DiceType.Hydro, 1)
  .done();

/**
 * @id 331301
 * @name 元素共鸣：交织之火
 * @description
 * 生成1个火元素骰。
 * （牌组包含至少2个火元素角色，才能加入牌组）
 */
export const ElementalResonanceWovenFlames = card(331301)
  .tags("resonance")
  .requireCharacterTag("pyro")
  .generateDice(DiceType.Pyro, 1)
  .done();

/**
 * @id 331401
 * @name 元素共鸣：交织之雷
 * @description
 * 生成1个雷元素骰。
 * （牌组包含至少2个雷元素角色，才能加入牌组）
 */
export const ElementalResonanceWovenThunder = card(331401)
  .tags("resonance")
  .requireCharacterTag("electro")
  .generateDice(DiceType.Electro, 1)
  .done();

/**
 * @id 331501
 * @name 元素共鸣：交织之风
 * @description
 * 生成1个风元素骰。
 * （牌组包含至少2个风元素角色，才能加入牌组）
 */
export const ElementalResonanceWovenWinds = card(331501)
  .tags("resonance")
  .requireCharacterTag("anemo")
  .generateDice(DiceType.Anemo, 1)
  .done();

/**
 * @id 331601
 * @name 元素共鸣：交织之岩
 * @description
 * 生成1个岩元素骰。
 * （牌组包含至少2个岩元素角色，才能加入牌组）
 */
export const ElementalResonanceWovenStone = card(331601)
  .tags("resonance")
  .requireCharacterTag("geo")
  .generateDice(DiceType.Geo, 1)
  .done();

/**
 * @id 331701
 * @name 元素共鸣：交织之草
 * @description
 * 生成1个草元素骰。
 * （牌组包含至少2个草元素角色，才能加入牌组）
 */
export const ElementalResonanceWovenWeeds = card(331701)
  .tags("resonance")
  .requireCharacterTag("dendro")
  .generateDice(DiceType.Dendro, 1)
  .done();

/**
 * @id 331801
 * @name 风与自由
 * @description
 * 本回合中，我方角色使用技能后：将下一个我方后台角色切换到场上。
 * （牌组包含至少2个「蒙德」角色，才能加入牌组）
 */
export const WindAndFreedom = card(331801)
  .toCombatStatus(303181)
  .oneDuration()
  .on("useSkill")
  .switchActive("my next")
  .done();

/**
 * @id 331802
 * @name 岩与契约
 * @description
 * 下回合行动阶段开始时：生成3点万能元素，抓1张牌。
 * （牌组包含至少2个「璃月」角色，才能加入牌组）
 */
export const StoneAndContracts = card(331802)
  .costVoid(3)
  .requireCharacterTag("liyue")
  .toCombatStatus(303182)
  .once("actionPhase")
  .generateDice(DiceType.Omni, 3)
  .drawCards(1)
  .done();

/**
 * @id 331803
 * @name 雷与永恒
 * @description
 * 将我方所有元素骰转换为万能元素。
 * （牌组包含至少2个「稻妻」角色，才能加入牌组）
 */
export const ThunderAndEternity = card(331803)
  .do((c) => {
    const count = c.player.dice.length;
    c.absorbDice("seq", count);
    c.generateDice(DiceType.Omni, count);
  })
  .done();

/**
 * @id 331804
 * @name 草与智慧
 * @description
 * 抓1张牌。然后，选择任意手牌替换。
 * （牌组包含至少2个「须弥」角色，才能加入牌组）
 */
export const NatureAndWisdom = card(331804)
  .costSame(1)
  .requireCharacterTag("sumeru")
  .drawCards(1)
  .switchCards()
  .done();

/**
 * @id 332001
 * @name 最好的伙伴！
 * @description
 * 将所花费的元素骰转换为2个万能元素。
 */
export const TheBestestTravelCompanion = card(332001)
  .costVoid(2)
  .generateDice(DiceType.Omni, 2)
  .done();

/**
 * @id 332002
 * @name 换班时间
 * @description
 * 我方下次执行「切换角色」行动时：少花费1个元素骰。
 */
export const ChangingShifts = card(332002)
  .toCombatStatus(303202)
  .once("deductDiceSwitch")
  .deductCost(DiceType.Omni, 1)
  .done();

/**
 * @id 332003
 * @name 一掷乾坤
 * @description
 * 选择任意元素骰重投，可重投2次。
 */
export const TossUp = card(332003)
  .reroll(2)
  .done();

/**
 * @id 332004
 * @name 运筹帷幄
 * @description
 * 抓2张牌。
 */
export const Strategize = card(332004)
  .costSame(1)
  .drawCards(2)
  .done();

/**
 * @id 303205
 * @name 本大爷还没有输！（冷却中）
 * @description
 * 本回合无法再打出「本大爷还没有输！」。
 */
export const IHaventLostYetCooldown = combatStatus(303205)
  .oneDuration()
  .done()

/**
 * @id 332005
 * @name 本大爷还没有输！
 * @description
 * 本回合有我方角色被击倒，才能打出：生成1个万能元素，我方当前出战角色获得1点充能。（每回合中，最多只能打出1张「本大爷还没有输！」。）
 */
export const IHaventLostYet = card(332005)
  .filter((c) => c.player.hasDefeated && !c.$(`my combat status with definition id ${IHaventLostYetCooldown}`))
  .generateDice(DiceType.Omni, 1)
  .gainEnergy(1, "my active")
  .combatStatus(IHaventLostYetCooldown)
  .done();

/**
 * @id 332006
 * @name 交给我吧！
 * @description
 * 我方下次执行「切换角色」行动时：将此次切换视为「快速行动」而非「战斗行动」。
 */
export const LeaveItToMe = card(332006)
  .toCombatStatus(303206)
  .once("beforeFastSwitch")
  .setFastAction()
  .done();

/**
 * @id 332007
 * @name 鹤归之时
 * @description
 * 我方下一次使用技能后：将下一个我方后台角色切换到场上。
 */
export const WhenTheCraneReturned = card(332007)
  .costSame(1)
  .toCombatStatus(303207)
  .once("useSkill")
  .switchActive("my next")
  .done();

/**
 * @id 332008
 * @name 星天之兆
 * @description
 * 我方当前出战角色获得1点充能。
 */
export const Starsigns = card(332008)
  .costVoid(2)
  .do((c) => c.$("my active character")!.gainEnergy(1))
  .done();

/**
 * @id 332009
 * @name 白垩之术
 * @description
 * 从最多2个我方后台角色身上，转移1点充能到我方出战角色。
 */
export const CalxsArts = card(332009)
  .costSame(1)
  .do((c) => {
    const chs = c.$$("my standby characters limit 2");
    let count = 0;
    for (const ch of chs) {
      count += ch.loseEnergy();
    }
    c.$("my active character")!.gainEnergy(count);
  })
  .done();

/**
 * @id 332010
 * @name 诸武精通
 * @description
 * 将一个装备在我方角色的「武器」装备牌，转移给另一个武器类型相同的我方角色，并重置其效果的「每回合」次数限制。
 */
export const MasterOfWeaponry = card(332010)
  .addTarget("my character has equipment with tag (weapon)")
  .addTarget("my character with tag weapon of (@targets.0) and not @targets.0")
  .do((c, e) => {
    const weapon = c.of(e.targets[0]).removeWeapon()!;
    c.of(e.targets[1]).equip(weapon.definition.id as any);
  })
  .done();

/**
 * @id 332011
 * @name 神宝迁宫祝词
 * @description
 * 将一个装备在我方角色的「圣遗物」装备牌，转移给另一个我方角色，并重置其效果的「每回合」次数限制。
 */
export const BlessingOfTheDivineRelicsInstallation = card(332011)
  .addTarget("my character has equipment with tag (artifact)")
  .addTarget("my character and not @targets.0")
  .do((c, e) => {
    const artifact = c.of(e.targets[0]).removeArtifact()!;
    c.of(e.targets[1]).equip(artifact.definition.id as any);
  })
  .done();

/**
 * @id 332012
 * @name 快快缝补术
 * @description
 * 选择一个我方「召唤物」，使其「可用次数」+1。
 */
export const QuickKnit = card(332012)
  .costSame(1)
  .addTarget("my summons")
  .do((c, e) => {
    c.of(e.targets[0]).addVariable("usage", 1);
  })
  .done();

/**
 * @id 332013
 * @name 送你一程
 * @description
 * 选择一个敌方「召唤物」，使其「可用次数」-2。
 */
export const SendOff = card(332013)
  .costSame(2)
  .addTarget("opp summon")
  .do((c, e) => {
    const currentUsage = c.getVariable("usage", e.targets[0]);
    const finalUsage = Math.max(0, currentUsage - 2);
    c.setVariable("usage", finalUsage, e.targets[0]);
    if (finalUsage <= 0 && c.getVariable("disposeWhenUsageIsZero", e.targets[0])) {
      c.dispose(e.targets[0]);
    }
  })
  .done();

/**
 * @id 332014
 * @name 护法之誓
 * @description
 * 消灭所有「召唤物」。（不分敌我！）
 */
export const GuardiansOath = card(332014)
  .costSame(4)
  .dispose("all summons")
  .done();

/**
 * @id 332015
 * @name 深渊的呼唤
 * @description
 * 召唤一个随机「丘丘人」召唤物！
 * （牌组包含至少2个「魔物」角色，才能加入牌组）
 */
export const AbyssalSummons = card(332015)
  .costSame(2)
  .requireCharacterTag("monster")
  .do((c) => {
    c.summon(
      c.random(
        CryoHilichurlShooter, 
        HydroSamachurl, 
        HilichurlBerserker, 
        ElectroHilichurlShooter
      )
    );
  })
  .done();

/**
 * @id 332016
 * @name 愚人众的阴谋
 * @description
 * 在对方场上，生成1个随机类型的「愚人众伏兵」。
 * （牌组包含至少2个「愚人众」角色，才能加入牌组）
 */
export const FatuiConspiracy = card(332016)
  .costSame(2)
  .requireCharacterTag("fatui")
  .do((c) => {
    c.combatStatus(
      c.random(
        FatuiAmbusherCryoCicinMage,
        FatuiAmbusherMirrorMaiden,
        FatuiAmbusherPyroslingerBracer,
        FatuiAmbusherElectrohammerVanguard
      ),
      "opp"
    );
  })
  .done();

/**
 * @id 332017
 * @name 下落斩
 * @description
 * 战斗行动：切换到目标角色，然后该角色进行「普通攻击」。
 */
export const PlungingStrike = card(332017)
  .costSame(3)
  .tags("action")
  .addTarget("my characters")
  .switchActive("@targets.0")
  .useSkill("normal")
  .done();

/**
 * @id 332018
 * @name 重攻击
 * @description
 * 本回合中，当前我方出战角色下次「普通攻击」造成的伤害+1。
 * 此次「普通攻击」为重击时：伤害额外+1。
 */
export const HeavyStrike = card(332018)
  .costSame(1)
  .toStatus("my active", 303220)
  .oneDuration()
  .once("modifySkillDamage", (c, e) => e.viaSkillType("normal"))
  .increaseDamage(1)
  .if((c, e) => e.viaChargedAttack())
  .increaseDamage(1)
  .done();

/**
 * @id 332019
 * @name 温妮莎传奇
 * @description
 * 生成4个不同类型的基础元素骰。
 */
export const TheLegendOfVennessa = card(332019)
  .costSame(3)
  .generateDice("randomElement", 4)
  .done();

/**
 * @id 332020
 * @name 永远的友谊
 * @description
 * 手牌数小于4的牌手抓牌，直到手牌数各为4张。
 */
export const FriendshipEternal = card(332020)
  .costSame(2)
  .do((c) => {
    if (c.player.hands.length < 4) {
      c.drawCards(4 - c.player.hands.length, { who: "my" });
    }
    if (c.oppPlayer.hands.length < 4) {
      c.drawCards(4 - c.oppPlayer.hands.length, { who: "opp" });
    }
  })
  .done();

/**
 * @id 332021
 * @name 大梦的曲调
 * @description
 * 我方下次打出「武器」或「圣遗物」手牌时：少花费1个元素骰。
 */
export const RhythmOfTheGreatDream = card(332021)
  .toCombatStatus(302021)
  .once("deductDiceCard", (c, e) => e.hasOneOfCardTag("weapon", "artifact"))
  .deductCost(DiceType.Omni, 1)
  .done();

/**
 * @id 332022
 * @name 藏锋何处
 * @description
 * 将一个我方角色所装备的「武器」返回手牌。
 * 本回合中，我方下次打出「武器」手牌时：少花费2个元素骰。
 */
export const WhereIsTheUnseenRazor = card(332022)
  .addTarget("my character has equipment with tag (weapon)")
  .do((c, e) => {
    const { definition } = c.of(e.targets[0]).removeArtifact()!;
    c.createHandCard(definition.id as CardHandle);
  })
  .toCombatStatus(303222)
  .oneDuration()
  .once("deductDiceCard", (c, e) => e.hasCardTag("weapon"))
  .deductCost(DiceType.Omni, 2)
  .done();

/**
 * @id 332023
 * @name 拳力斗技！
 * @description
 * 我方至少剩余8个元素骰，且对方未宣布结束时，才能打出：本回合中一位牌手先宣布结束时，未宣布结束的牌手抓2张牌。
 */
export const Pankration = card(332023)
  .filter((c) => c.player.dice.length >= 8 && !c.oppPlayer.declaredEnd)
  .toCombatStatus(303223)
  .once("declareEnd")
  .listenToAll()
  .do((c) => {
    if (c.player.declaredEnd) {
      c.drawCards(2, { who: "opp" });
    } else {
      c.drawCards(2, { who: "my" });
    }
  })
  .done();

/**
 * @id 332024
 * @name 琴音之诗
 * @description
 * 将一个我方角色所装备的「圣遗物」返回手牌。
 * 本回合中，我方下次打出「圣遗物」手牌时：少花费2个元素骰。
 */
export const Lyresong = card(332024)
  .addTarget("my character has equipment with tag (artifact)")
  .do((c, e) => {
    const { definition } = c.of(e.targets[0]).removeArtifact()!;
    c.createHandCard(definition.id as CardHandle);
  })
  .toCombatStatus(303224)
  .oneDuration()
  .once("deductDiceCard", (c, e) => e.hasCardTag("artifact"))
  .deductCost(DiceType.Omni, 2)
  .done();

/**
 * @id 332025
 * @name 野猪公主
 * @description
 * 本回合中，我方每有一张装备在角色身上的「装备牌」被弃置时：获得1个万能元素。（最多获得2个）
 * （角色被击倒时弃置装备牌，或者覆盖装备「武器」或「圣遗物」，都可以触发此效果）
 */
export const TheBoarPrincess = card(332025)
  .toCombatStatus(303225)
  .oneDuration()
  .on("dispose", (c, e) => e.entity.definition.type === "equipment")
  .usage(2)
  .generateDice(DiceType.Omni, 1)
  .done();

/**
 * @id 332026
 * @name 坍陷与契机
 * @description
 * 我方至少剩余8个元素骰，且对方未宣布结束时，才能打出：本回合中，双方牌手进行「切换角色」行动时需要额外花费1个元素骰。
 */
export const FallsAndFortune = card(332026)
  .costSame(1)
  .filter((c) => c.player.dice.length >= 8 && !c.oppPlayer.declaredEnd)
  .toCombatStatus(303226)
  .oneDuration()
  .on("modifyAction", (c, e) => e.action.type === "switchActive")
  .listenToAll()
  .addCost(DiceType.Void, 1)
  .done();

/**
 * @id 332027
 * @name 浮烁的四叶印
 * @description
 * 目标角色附属四叶印：每个回合的结束阶段，我方都切换到此角色。
 */
export const FlickeringFourleafSigil = card(332027)
  .addTarget("my characters")
  .toStatus("@targets.0", 303227)
  .on("endPhase")
  .switchActive("@master")
  .done();

/**
 * @id 332028
 * @name 机关铸成之链
 * @description
 * 目标我方角色每次受到伤害或治疗后：累积1点「备战度」（最多累积2点）。
 * 我方打出原本费用不多于「备战度」的「武器」或「圣遗物」时：移除所有「备战度」，以免费打出该牌。
 */
export const MachineAssemblyLine = card(332028)
  .addTarget("my characters")
  .toStatus("@targets.0", 303228)
  .variable("readiness", 0)
  .on("damaged")
  .addVariableWithMax("readiness", 1, 2)
  .on("healed")
  .addVariableWithMax("readiness", 1, 2)
  .once("deductDiceCard", (c, e) =>
    e.hasOneOfCardTag("weapon", "artifact") &&
    e.action.card.definition.skillDefinition.requiredCost.length <= c.getVariable("readiness"))
  .do((c, e) => {
    e.deductCost(DiceType.Omni, e.cost.length);
    c.setVariable("readiness", 0);
  })
  .done();

/**
 * @id 332029
 * @name 净觉花
 * @description
 * 选择一张我方支援区的牌，将其弃置。然后，在我方手牌中随机生成2张支援牌。
 * 本回合中，我方下次打出支援牌时：少花费1个元素骰。
 */
export const SunyataFlower = card(332029)
  .addTarget("my supports")
  .dispose("@targets.0")
  .do((c) => {
    const candidates = [...c.state.data.cards.values()].filter((card) => card.type === "support");
    const card0 = c.random(...candidates);
    const card1 = c.random(...candidates);
    c.createHandCard(card0.id as CardHandle);
    c.createHandCard(card1.id as CardHandle);
  })
  .toCombatStatus(303229)
  .oneDuration()
  .once("deductDiceCard", (c, e) => e.action.card.definition.type === "support")
  .deductCost(DiceType.Omni, 1)
  .done();
