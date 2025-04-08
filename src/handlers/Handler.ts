/**
 * Handler interface for processing views
 */
export default interface Handler {
  handle(data: any, next: NextFunction): any;
}

/**
 * Next function type for chaining handlers
 */
export type NextFunction = (data: any) => void;
