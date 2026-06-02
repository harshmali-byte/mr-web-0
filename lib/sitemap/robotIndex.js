/** RobotIndex values aligned with components/Common/Constants.js RobotIndexes */

export function isIndexableRobotIndex(robotIndex) {
  if (robotIndex === undefined || robotIndex === null) {
    return true;
  }
  const value = Number(robotIndex);
  return value === 0 || value === 1;
}
