import msgpack from '@ygoe/msgpack';

type DayTimeOption = {
  breakfast?: [number, number, number, number], // [start hour, start minute, end hour, end minute]
  lunch?: [number, number, number, number],
  dinner?: [number, number, number, number]
}

export interface Option {
  time?: {
    0?: DayTimeOption;
    1?: DayTimeOption;
    2?: DayTimeOption;
    3?: DayTimeOption;
    4?: DayTimeOption;
    5?: DayTimeOption;
    6?: DayTimeOption;
  };
  includeAllergy?: boolean;
}

type MinifiedDayTimeOption = {
  b?: [number, number, number, number], // [start hour, start minute, end hour, end minute]
  l?: [number, number, number, number],
  d?: [number, number, number, number]
}

export interface MinifiedOption {
  t?: {
    0?: MinifiedDayTimeOption;
    1?: MinifiedDayTimeOption;
    2?: MinifiedDayTimeOption;
    3?: MinifiedDayTimeOption;
    4?: MinifiedDayTimeOption;
    5?: MinifiedDayTimeOption;
    6?: MinifiedDayTimeOption;
  },
  iA?: boolean;
}

function objToBase64(object: any) {
  return window.btoa(String.fromCharCode.apply(null, msgpack.encode(object)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '')
}

export function urlBuilder(options: Option) {
  let minifiedOption: MinifiedOption = {};
  if (options.time) {
    minifiedOption.t = {}
  }
  for(let day in options.time) {
    minifiedOption.t[day] = {}
    for(let type in options.time[day]) {
      switch (type) {
        case 'breakfast':
          minifiedOption.t[day].b = options.time[day].breakfast;
          break;
        case 'lunch':
          minifiedOption.t[day].l = options.time[day].lunch;
          break;
        case 'dinner':
          minifiedOption.t[day].d = options.time[day].dinner;
          break;
      }
    }
  }
  if(options.includeAllergy) {
    minifiedOption.iA = options.includeAllergy;
  }
  return location.origin + '/' + objToBase64(minifiedOption);
}