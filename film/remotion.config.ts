import { Config } from "@remotion/cli/config";

// Use the locally installed Chromium headless shell (no download needed).
// Remove this line on a normal machine and Remotion will fetch its own.
if (process.env.REMOTION_CHROME) Config.setBrowserExecutable(process.env.REMOTION_CHROME);
Config.setVideoImageFormat("jpeg");
Config.setJpegQuality(95);
Config.setChromiumOpenGlRenderer("swangle");
