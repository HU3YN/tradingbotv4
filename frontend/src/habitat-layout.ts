/** Shared coordinates keep the desks, supporting wood, and planting clearances aligned. */
export const STATION_LAYOUT: [number, number, number, number][] = [
  [-2.15, 0.18, 1.85, 0.35],
  [2.00, 0.18, 1.85, -0.40],
  [-2.30, 3.64, -0.80, 0.16],
  [2.30, 2.42, 0.28, -0.38],
];

export const LEFT_BRANCH: [number, number, number][] = [
  [-3.25, 3.68, -1.05],
  [-2.30, 3.40, -0.80],
  [-1.25, 2.98, -0.55],
  [-0.30, 2.42, -0.30],
];

export const DRIP_TIP = LEFT_BRANCH[LEFT_BRANCH.length - 1];
export const DRIP_INTERVAL = 1.45;
export const DRIP_GRAVITY = 1.65;

/** The rising right fork provides a clear perch beyond Bluey's workstation. */
export const RIGHT_FORK: [number, number, number][] = [
  [2.45, 2.10, .05], [2.92, 2.45, -.18], [3.25, 2.85, -.60], [3.16, 3.09, -1.35],
];
