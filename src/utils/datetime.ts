/**
 * Calculates the cutoff date based on the number of days.
 * @param days The number of days to subtract from the current date.
 * @returns The calculated cutoff date.
 */
export function getCutoffDate(days: number): Date {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    return cutoffDate;
}