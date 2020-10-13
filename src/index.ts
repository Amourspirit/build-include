import { BuildProcess } from "./BuildProcess";
import { IOpt } from "./interface/projectInterfaces";

/**
 * Reads a file from disk and applys options to file.
 * @param filePath File to read and apply options to
 * @param options Options to apply
 * @returns string representing file with change of options applied
 */
export const buildInclude = (filePath: string, options?:IOpt): string => {
  const bp = new BuildProcess();
	return bp.buildInclude('', filePath, options);
}
