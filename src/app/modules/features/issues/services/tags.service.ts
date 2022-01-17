export abstract class TagsService {
  /**
   * @returns tags based on issues
   */
  abstract getAll(): string[];
}
