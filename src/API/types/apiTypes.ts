export interface IAllPokemons {
    count: number;
    next: string | null;
    previous: string | null;
    results: IPokemonsResults[];
  }

export interface IPokemonsResults {
    name: string;
    url: string;
}

export interface Pokemon {
    abilities: Ability[];
    base_experience: number;
    forms: IAllItems[];
    game_indices: IGameInfo[];
    height: number;
    held_items: IHeldItem[];
    id: number;
    is_default: boolean;
    location_area_encounters: string;
    moves: IMove[];
    name: string;
    order: number;
    past_abilities: [];
    past_types: [];
    species: IAllItems;
    sprites: ISprites;
    stats: IStat[];
    types: IType[];
    weight: number;
}

interface Ability {
    ability: IAllItems;
    is_hidden: boolean;
    slot: number;
}

export interface IAllItems {
    name: string;
    url: string;
}

export interface IGameInfo {
    game_index: number;
    url: string;
}

interface IHeldItem {
    item: {
      name: string;
      url: string;
    };
    version_details: IVersionDetails[];
}

interface IVersionDetails {
    rarity: number;
    version: {
      name: string;
      url: string;
    };
}

interface IMove {
    move: IAllItems;
    version_group_details: IVersionGroupDetails[];
}

interface IVersionGroupDetails {
    level_learned_at: number;
    move_learn_method: IAllItems;
    version_group: IAllItems;
}

interface ISprites {
    back_default: string | null;
    back_female: string | null;
    back_shiny: string | null;
    back_shiny_female: string | null;
    front_default: string | null;
    front_female: string | null;
    front_shiny: string | null;
    front_shiny_female: string | null;
    other: {
      dream_world: {
        front_default: string | null;
        front_female: string | null;
      };
      home: {
        front_default: string | null;
        front_female: string | null;
        front_shiny: string | null;
        front_shiny_female: string | null;
      };
      official_artwork: {
        front_default: string | null;
        front_shiny: string | null;
      };
    };
    versions: {
      generation_i: {
        red_blue: {
          back_default: string;
          back_gray: string;
          back_transparent: string;
          front_default: string;
          front_gray: string;
          front_transparent: string;
        };
        yellow: {
          back_default: string;
          back_gray: string;
          back_transparent: string;
          front_default: string;
          front_gray: string;
          front_transparent: string;
        };
      };
      generation_ii: {
        crystal: {
          back_default: string;
          back_shiny: string;
          back_shiny_transparent: string;
          back_transparent: string;
          front_default: string;
          front_shiny: string;
          front_shiny_transparent: string;
          front_transparent: string;
        };
        gold: {
          back_default: string;
          back_shiny: string;
          front_default: string;
          front_shiny: string;
          front_transparent: string;
        };
        silver: {
          back_default: string;
          back_shiny: string;
          front_default: string;
          front_shiny: string;
          front_transparent: string;
        };
      };
      generation_iii: {
        emerald: {
          front_default: string;
          front_shiny: string;
        };
        firered_leafgreen: {
          back_default: string;
          back_shiny: string;
          front_default: string;
          front_shiny: string;
        };
        ruby_sapphire: {
          back_default: string;
          back_shiny: string;
          front_default: string;
          front_shiny: string;
        };
      };
      generation_iv: {
        diamond_pearl: {
          back_default: string;
          back_female: string | null;
          back_shiny: string;
          back_shiny_female: string | null;
          front_default: string;
          front_female: string | null;
          front_shiny: string;
          front_shiny_female: string | null;
        };
        heartgold_soulsilver: {
          back_default: string;
          back_female: string | null;
          back_shiny: string;
          back_shiny_female: string | null;
          front_default: string;
          front_female: string | null;
          front_shiny: string;
          front_shiny_female: string | null;
        };
        platinum: {
          back_default: string;
          back_female: string | null;
          back_shiny: string;
          back_shiny_female: string | null;
          front_default: string;
          front_female: string | null;
          front_shiny: string;
          front_shiny_female: string | null;
        };
      };
      generation_v: {
        black_white: {
          animated: {
            back_default: string;
            back_female: string | null;
            back_shiny: string;
            back_shiny_female: string | null;
            front_default: string;
            front_female: string | null;
            front_shiny: string;
            front_shiny_female: string | null;
          };
          back_default: string;
          back_female: string | null;
          back_shiny: string;
          back_shiny_female: string | null;
          front_default: string;
          front_female: string | null;
          front_shiny: string;
          front_shiny_female: string | null;
        };
      };
      generation_vi: {
        omegaruby_alphasapphire: {
          front_default: string;
          front_female: string | null;
          front_shiny: string;
          front_shiny_female: string | null;
        };
        x_y: {
          front_default: string;
          front_female: string | null;
          front_shiny: string;
          front_shiny_female: string | null;
        };
      };
      generation_vii: {
        icons: {
          front_default: string;
          front_female: null | string;
        };
        ultra_sun_ultra_moon: {
          front_default: string;
          front_female: string | null;
          front_shiny: string;
          front_shiny_female: string | null;
        };
      };
      generation_viii: {
        icons: {
          front_default: string;
          front_female: string | null;
        };
      };
    };
}

interface IStat {
    base_stat: number;
    effort: number;
    stat: IAllItems;
}

interface IType {
    slot: number;
    type: IAllItems;
}