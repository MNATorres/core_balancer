export interface Team {
  name: string;
  code: string; // FIFA 3-letter country code (e.g. ARG, FRA)
  ranking?: number; // FIFA ranking at that time
}

export interface Group {
  name: string; // "Group A", "Group B", etc.
  teams: Team[];
}

export interface WorldCupEdition {
  year: number;
  host: string;
  champion: string;
  championCode: string;
  runnerUp: string;
  runnerUpCode: string;
  groups: Group[];
}

export const worldCupData: Record<number, WorldCupEdition> = {
  2026: {
    year: 2026,
    host: 'Canada, Mexico, United States',
    champion: 'TBD (Ongoing)',
    championCode: 'TBD',
    runnerUp: 'TBD (Ongoing)',
    runnerUpCode: 'TBD',
    groups: [
      {
        name: 'Group A',
        teams: [
          { name: 'Mexico', code: 'MEX', ranking: 15 },
          { name: 'South Korea', code: 'KOR', ranking: 23 },
          { name: 'Czechia', code: 'CZE', ranking: 36 },
          { name: 'South Africa', code: 'RSA', ranking: 59 }
        ]
      },
      {
        name: 'Group B',
        teams: [
          { name: 'Switzerland', code: 'SUI', ranking: 19 },
          { name: 'Qatar', code: 'QAT', ranking: 34 },
          { name: 'Canada', code: 'CAN', ranking: 40 },
          { name: 'Bosnia & Herz.', code: 'BIH', ranking: 74 }
        ]
      },
      {
        name: 'Group C',
        teams: [
          { name: 'Brazil', code: 'BRA', ranking: 5 },
          { name: 'Morocco', code: 'MAR', ranking: 12 },
          { name: 'Scotland', code: 'SCO', ranking: 39 },
          { name: 'Haiti', code: 'HAI', ranking: 85 }
        ]
      },
      {
        name: 'Group D',
        teams: [
          { name: 'United States', code: 'USA', ranking: 11 },
          { name: 'Australia', code: 'AUS', ranking: 24 },
          { name: 'Türkiye', code: 'TUR', ranking: 35 },
          { name: 'Paraguay', code: 'PAR', ranking: 56 }
        ]
      },
      {
        name: 'Group E',
        teams: [
          { name: 'Ecuador', code: 'ECU', ranking: 31 },
          { name: 'Côte d\'Ivoire', code: 'CIV', ranking: 38 },
          { name: 'Germany', code: 'GER', ranking: 16 },
          { name: 'Curaçao', code: 'CUW', ranking: 86 }
        ]
      },
      {
        name: 'Group F',
        teams: [
          { name: 'Netherlands', code: 'NED', ranking: 7 },
          { name: 'Japan', code: 'JPN', ranking: 18 },
          { name: 'Sweden', code: 'SWE', ranking: 28 },
          { name: 'Tunisia', code: 'TUN', ranking: 41 }
        ]
      },
      {
        name: 'Group G',
        teams: [
          { name: 'Belgium', code: 'BEL', ranking: 6 },
          { name: 'Iran', code: 'IRN', ranking: 20 },
          { name: 'Egypt', code: 'EGY', ranking: 30 },
          { name: 'New Zealand', code: 'NZL', ranking: 104 }
        ]
      },
      {
        name: 'Group H',
        teams: [
          { name: 'Spain', code: 'ESP', ranking: 3 },
          { name: 'Uruguay', code: 'URU', ranking: 15 },
          { name: 'Saudi Arabia', code: 'KSA', ranking: 57 },
          { name: 'Cabo Verde', code: 'CPV', ranking: 65 }
        ]
      },
      {
        name: 'Group I',
        teams: [
          { name: 'France', code: 'FRA', ranking: 2 },
          { name: 'Senegal', code: 'SEN', ranking: 21 },
          { name: 'Norway', code: 'NOR', ranking: 47 },
          { name: 'Iraq', code: 'IRQ', ranking: 58 }
        ]
      },
      {
        name: 'Group J',
        teams: [
          { name: 'Argentina', code: 'ARG', ranking: 1 },
          { name: 'Austria', code: 'AUT', ranking: 22 },
          { name: 'Algeria', code: 'ALG', ranking: 43 },
          { name: 'Jordan', code: 'JOR', ranking: 71 }
        ]
      },
      {
        name: 'Group K',
        teams: [
          { name: 'Portugal', code: 'POR', ranking: 8 },
          { name: 'Colombia', code: 'COL', ranking: 12 },
          { name: 'DR Congo', code: 'COD', ranking: 61 },
          { name: 'Uzbekistan', code: 'UZB', ranking: 64 }
        ]
      },
      {
        name: 'Group L',
        teams: [
          { name: 'England', code: 'ENG', ranking: 4 },
          { name: 'Croatia', code: 'CRO', ranking: 10 },
          { name: 'Panama', code: 'PAN', ranking: 45 },
          { name: 'Ghana', code: 'GHA', ranking: 68 }
        ]
      }
    ]
  },
  2022: {
    year: 2022,
    host: 'Qatar',
    champion: 'Argentina',
    championCode: 'ARG',
    runnerUp: 'France',
    runnerUpCode: 'FRA',
    groups: [
      {
        name: 'Group A',
        teams: [
          { name: 'Netherlands', code: 'NED', ranking: 8 },
          { name: 'Senegal', code: 'SEN', ranking: 18 },
          { name: 'Ecuador', code: 'ECU', ranking: 44 },
          { name: 'Qatar', code: 'QAT', ranking: 50 }
        ]
      },
      {
        name: 'Group B',
        teams: [
          { name: 'England', code: 'ENG', ranking: 5 },
          { name: 'USA', code: 'USA', ranking: 16 },
          { name: 'Iran', code: 'IRN', ranking: 20 },
          { name: 'Wales', code: 'WAL', ranking: 19 }
        ]
      },
      {
        name: 'Group C',
        teams: [
          { name: 'Argentina', code: 'ARG', ranking: 3 },
          { name: 'Poland', code: 'POL', ranking: 26 },
          { name: 'Mexico', code: 'MEX', ranking: 13 },
          { name: 'Saudi Arabia', code: 'KSA', ranking: 51 }
        ]
      },
      {
        name: 'Group D',
        teams: [
          { name: 'France', code: 'FRA', ranking: 4 },
          { name: 'Australia', code: 'AUS', ranking: 38 },
          { name: 'Tunisia', code: 'TUN', ranking: 30 },
          { name: 'Denmark', code: 'DEN', ranking: 10 }
        ]
      },
      {
        name: 'Group E',
        teams: [
          { name: 'Japan', code: 'JPN', ranking: 24 },
          { name: 'Spain', code: 'ESP', ranking: 7 },
          { name: 'Germany', code: 'GER', ranking: 11 },
          { name: 'Costa Rica', code: 'CRC', ranking: 31 }
        ]
      },
      {
        name: 'Group F',
        teams: [
          { name: 'Morocco', code: 'MAR', ranking: 22 },
          { name: 'Croatia', code: 'CRO', ranking: 12 },
          { name: 'Belgium', code: 'BEL', ranking: 2 },
          { name: 'Canada', code: 'CAN', ranking: 41 }
        ]
      },
      {
        name: 'Group G',
        teams: [
          { name: 'Brazil', code: 'BRA', ranking: 1 },
          { name: 'Switzerland', code: 'SUI', ranking: 15 },
          { name: 'Cameroon', code: 'CMR', ranking: 43 },
          { name: 'Serbia', code: 'SRB', ranking: 21 }
        ]
      },
      {
        name: 'Group H',
        teams: [
          { name: 'Portugal', code: 'POR', ranking: 9 },
          { name: 'South Korea', code: 'KOR', ranking: 28 },
          { name: 'Uruguay', code: 'URU', ranking: 14 },
          { name: 'Ghana', code: 'GHA', ranking: 61 }
        ]
      }
    ]
  },
  2018: {
    year: 2018,
    host: 'Russia',
    champion: 'France',
    championCode: 'FRA',
    runnerUp: 'Croatia',
    runnerUpCode: 'CRO',
    groups: [
      {
        name: 'Group A',
        teams: [
          { name: 'Uruguay', code: 'URU', ranking: 14 },
          { name: 'Russia', code: 'RUS', ranking: 70 },
          { name: 'Saudi Arabia', code: 'KSA', ranking: 67 },
          { name: 'Egypt', code: 'EGY', ranking: 45 }
        ]
      },
      {
        name: 'Group B',
        teams: [
          { name: 'Spain', code: 'ESP', ranking: 10 },
          { name: 'Portugal', code: 'POR', ranking: 4 },
          { name: 'Iran', code: 'IRN', ranking: 37 },
          { name: 'Morocco', code: 'MAR', ranking: 41 }
        ]
      },
      {
        name: 'Group C',
        teams: [
          { name: 'France', code: 'FRA', ranking: 7 },
          { name: 'Denmark', code: 'DEN', ranking: 12 },
          { name: 'Peru', code: 'PER', ranking: 11 },
          { name: 'Australia', code: 'AUS', ranking: 36 }
        ]
      },
      {
        name: 'Group D',
        teams: [
          { name: 'Croatia', code: 'CRO', ranking: 20 },
          { name: 'Argentina', code: 'ARG', ranking: 5 },
          { name: 'Nigeria', code: 'NGA', ranking: 48 },
          { name: 'Iceland', code: 'ISL', ranking: 22 }
        ]
      },
      {
        name: 'Group E',
        teams: [
          { name: 'Brazil', code: 'BRA', ranking: 2 },
          { name: 'Switzerland', code: 'SUI', ranking: 6 },
          { name: 'Serbia', code: 'SRB', ranking: 34 },
          { name: 'Costa Rica', code: 'CRC', ranking: 23 }
        ]
      },
      {
        name: 'Group F',
        teams: [
          { name: 'Sweden', code: 'SWE', ranking: 24 },
          { name: 'Mexico', code: 'MEX', ranking: 15 },
          { name: 'South Korea', code: 'KOR', ranking: 57 },
          { name: 'Germany', code: 'GER', ranking: 1 }
        ]
      },
      {
        name: 'Group G',
        teams: [
          { name: 'Belgium', code: 'BEL', ranking: 3 },
          { name: 'England', code: 'ENG', ranking: 12 },
          { name: 'Tunisia', code: 'TUN', ranking: 21 },
          { name: 'Panama', code: 'PAN', ranking: 55 }
        ]
      },
      {
        name: 'Group H',
        teams: [
          { name: 'Colombia', code: 'COL', ranking: 16 },
          { name: 'Japan', code: 'JPN', ranking: 61 },
          { name: 'Senegal', code: 'SEN', ranking: 27 },
          { name: 'Poland', code: 'POL', ranking: 8 }
        ]
      }
    ]
  }
};
