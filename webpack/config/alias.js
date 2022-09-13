/**
 * Created by: Andrey Polyakov (andrey@polyakov.im)
 * @see https://webpack.js.org/configuration/dev-server/
 */
import { join } from "path";

import { rootDir } from "../utils/env";

export const aliasItems = {
  "@src": join(rootDir, "/src"),
  "@images": join(rootDir, "/src/images"),
  "@styles": join(rootDir, "/src/styles"),
  "@components": join(rootDir, "/src/components"),
  "@assets": join(rootDir, "/src/assets"),
  "@features": join(rootDir, "/src/features"),
  "@common": join(rootDir, "/src/common"),
};
