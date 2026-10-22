import { COMPARISON_MAPS, MAP_BY_ID } from '@/lib/maps/compare-config';

const EXPECTED_MAP_IDS = [
  'logistic',
  'henon',
  'tent',
  'ikeda',
  'tinkerbell',
  'duffing',
];

describe('compare-config', () => {
  it('contains expected map identifiers', () => {
    expect(COMPARISON_MAPS.map((map) => map.id)).toEqual(EXPECTED_MAP_IDS);
  });

  it('builds a full ID lookup map', () => {
    const configuredIds = COMPARISON_MAPS.map((map) => map.id);
    expect(Object.keys(MAP_BY_ID).sort()).toEqual(configuredIds.sort());

    COMPARISON_MAPS.forEach((map) => {
      expect(MAP_BY_ID[map.id]).toBe(map);
    });
  });

  it('exposes valid metadata for each map', () => {
    expect(COMPARISON_MAPS.length).toBeGreaterThan(0);

    COMPARISON_MAPS.forEach((map) => {
      expect(map.id).toBeTruthy();
      expect(map.name).toBeTruthy();
      expect(map.description).toBeTruthy();
      expect(map.description.length).toBeGreaterThan(5);
      expect(typeof map.calculate).toBe('function');
      expect(Number.isFinite(map.dimension)).toBe(true);
      expect(map.dimension).toBeGreaterThan(0);

      expect(map.paramRanges).toBeDefined();
      expect(Object.keys(map.paramRanges).length).toBeGreaterThan(0);
    });
  });
});

