import { ReactNode } from 'react';

export interface IPeople {
  count: number;
  next: string | null;
  previous: string | null;
  results: IPerson[];
  name: IPerson
}

export interface IPerson {
  birth_year: string;
  created: string;
  edited: string;
  eye_color: string;
  films: string[];
  gender: string;
  hair_color: string;
  height: string;
  homeworld: string;
  mass: string;
  name: string;
  skin_color: string;
  species: string[];
  starships: string[];
  url: string;
  vehicles: string[];
}

export interface MyComponentState {
  inputValue: string;
  data: IPerson[];
  loading: boolean;
  arrAllPages: number[];
  page: number;
  error: boolean;
}

export interface IInputNew {
  input: string;
  updateInput: (newInput: string) => void;
}

export interface IButtonSearch {
  input: string;
  itemAllPages: number;
  updateLoading: (newLoading: boolean) => void;
  updateData: (newData: DataPerson) => void;
  updateArrAllPages: (newArrAllPages: number[]) => void;
  updatePage: (newPage: number) => void;
}

export type DataPerson =  ITestData[] | IPeople | ITestData;

export interface IItemPerson {
  data: DataPerson;
}

export interface IButtonPage {
  arrAllPages: number[];
  page: number;
  input: string;
  itemAllPages: number;
  lastPage: number;
  updateLoading: (newLoading: boolean) => void;
  updateData: (newData: IPerson[]) => void;
  updateArrAllPages: (newArrAllPages: number[]) => void;
  updatePage: (newPage: number) => void;
  updateItemAllPages: (newPage: number) => void;
  updateSetLastPage: (newPage: number) => void;
}

export interface ITest {
  num: number;
  detailData: Pokemon;
  data: IPerson[];
  arrAllPages: number[];
  page: number;
  input: string;
  itemAllPages: number;
  lastPage: number;
  updateLoading: (newLoading: boolean) => void;
  updateData: (newData: IPerson[]) => void;
  updateArrAllPages: (newArrAllPages: number[]) => void;
  updatePage: (newPage: number) => void;
  updateItemAllPages: (newPage: number) => void;
  updateSetLastPage: (newPage: number) => void;
  updateSetOffset: (newPage: number) => void;
  updateSetDetailData: (data: Pokemon) => void;
}

export interface IItemComponents {
  data: DataPerson
  input: string;
  itemAllPages: number;
  lastPage: number;
  updateData: (newData: IPerson[]) => void;
  updateArrAllPages: (newArrAllPages: number[]) => void;
  updatePage: (newPage: number) => void;
  updateSetDetailData: (data: Pokemon) => void;

}

export interface ITestData {
  name: string;
  url: string;
}

export interface ErrorBoundaryProps {
  error: boolean;
  children: ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
}

export interface IErrorButton {
  updateError: (newEr: boolean) => void;
}

export interface IAllItems {
  name: string;
  url: string;
}

export interface IGameInfo {
  game_index: number;
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

export interface IDetailData {
  detailData: Pokemon | undefined
}

interface Ability {
  ability: IAllItems;
  is_hidden: boolean,
  slot: number,
}

interface IHeldItem {
  item: {
    name: string,
    url: string,
  },
  version_details: IVersionDetails[]
}

interface IVersionDetails {
    rarity: number,
    version: {
      name: string,
      url: string,
    }
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

interface IType {
  slot: number;
  type: IAllItems;
}

interface IStat {
  base_stat: number;
  effort: number;
  stat: IAllItems;
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
    }
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
    }
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
      }
    }
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
      }
      ruby_sapphire: {
        back_default: string;
        back_shiny: string;
        front_default: string;
        front_shiny: string;   
      }
    }
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
      }
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
      }
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
    }
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
    }
    generation_viii: {
      icons: {
        front_default: string;
        front_female: string | null;
      };
    };
  }
}

export interface IDescription {

}
