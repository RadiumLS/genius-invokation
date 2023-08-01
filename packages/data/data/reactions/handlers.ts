import { Context, DamageContext, DamageType, Reaction } from "@gi-tcg";
import { BurningFlame, CatalyzingField, Crystallize, DendroCore, Frozen } from "../status/reactions";

export type RContext = Context<object, DamageContext, true>;
export type ReactionHandler = (c: RContext) => void;

function swirl(srcElement: DamageType) {
  return (c: RContext) => {
    c.queryCharacterAll(`:exclude(#${c.target.entityId})`).forEach(ch => {
      c.dealDamage(1, srcElement, ch.asTarget());
    });
  }
}

function crystallize(c: RContext) {
  c.addDamage(1);
  c.createCombatStatus(Crystallize);
}

export const REACTION_HANDLERS: Record<Reaction, ReactionHandler> = {
  [Reaction.Melt]: (c) => {
    c.addDamage(2);
  },
  [Reaction.Vaporize]: (c) => {
    c.addDamage(2);
  },
  [Reaction.Overloaded]: (c) => {
    c.addDamage(2);
    if (c.target.isActive()) {
      c.switchActive("!>");
    }
  },
  [Reaction.Superconduct]: (c) => {
    c.addDamage(1);
    c.queryCharacterAll(`:exclude(#${c.target.entityId})`).forEach(ch => {
      c.dealDamage(1, DamageType.Piercing, ch.asTarget());
    });
  },
  [Reaction.ElectroCharged]: (c) => {
    c.addDamage(1);
    c.queryCharacterAll(`:exclude(#${c.target.entityId})`).forEach(ch => {
      c.dealDamage(1, DamageType.Hydro, ch.asTarget());
    });
  },
  [Reaction.Frozen]: (c) => {
    c.addDamage(1);
    c.target.createStatus(Frozen);
  },
  [Reaction.SwirlCryo]: swirl(DamageType.Cryo),
  [Reaction.SwirlHydro]: swirl(DamageType.Hydro),
  [Reaction.SwirlPyro]: swirl(DamageType.Pyro),
  [Reaction.SwirlElectro]: swirl(DamageType.Electro),
  [Reaction.CrystallizeCryo]: crystallize,
  [Reaction.CrystallizeHydro]: crystallize,
  [Reaction.CrystallizePyro]: crystallize,
  [Reaction.CrystallizeElectro]: crystallize,
  [Reaction.Burning]: (c) => {
    c.addDamage(1);
    c.summon(BurningFlame);
  },
  [Reaction.Bloom]: (c) => {
    c.addDamage(1);
    c.createCombatStatus(DendroCore);
  },
  [Reaction.Quicken]: (c) => {
    c.addDamage(1);
    c.createCombatStatus(CatalyzingField);
  },
} 
