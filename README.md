<img src='https://socialify.git.ci/zourdyzou/krakenmaze/image?description=1&font=Source%20Code%20Pro&forks=1&language=1&name=1&owner=1&pattern=Charlie%20Brown&pulls=1&stargazers=1&theme=Dark' />

## 🎪 Features

- ⚡️ Webpack
- ⚛️ React 
- ⛑ TypeScript
- 📏 ESLint — To find and fix problems in your code
- 💖 Prettier — Code Formatter for consistent style
- 🐶 Husky — For running scripts before committing
- 🚓 Commitlint — To make sure the commit messages follow the convention
- 🖌 Renovate — To keep the dependencies up to date
- 🚫 lint-staged — Run ESLint and Prettier against staged Git files
- 👷 CI/CD - Deploy the application easily using Github Workflows
- ⚙️ EditorConfig - Consistent coding styles across editors and IDEs
- 🗂 Path Mapping — Import components or images using the `@` prefix

## 📝  Data Sources
The information and data used in Cryptoscapes is provided kindly by the following sources:

- [CoinGecko][5]
- [ETH Gas Station][6]
- [Alternative.me][7]
- [Blockchain.com][8]


## 🎯 TODO: some of the things that needs to be working on.

- [ ] Add internationalization features (🌏 Third-party? or file-based?)
- [ ] Optimize bundling runtime, maybe Bun? (💡 Good-to-go but not important)
- [ ] SEO custom components, meta-data and json-ld (🧪 SEO optimization on google ranking)
- [ ] Image and Icon custom components that comply that WAI-ARIA convention
- [ ] Web Accessibility pre-caution for DX (🔰 Quite a feat)

## 📜 Documentation

### Requirements

- Node.js >= 14.16.0


### Directory Structure

- [`.github`](.github) — GitHub configuration including the CI workflow.<br>
- [`.husky`](.husky) — Husky configuration and hooks.<br>
- [`public`](./public) — Static assets such as robots.txt, images, and favicon.<br>
- [`src`](./src) — Application source code, including pages, components, styles.

### Scripts

- `yarn run dev` — Starts the application in development mode at `http://localhost:3000`.
- `yarn run build` — Creates an optimized production build of your application.
- `yarn run start` — Starts the application in production mode.
<!-- - `pnpm type-check` — Validate code using TypeScript compiler. -->
<!-- - `pnpm lint` — Runs ESLint for all files in the `src` directory. -->
<!-- - `pnpm format` — Runs Prettier for all files in the `src` directory. -->

### Path Mapping

TypeScript are pre-configured with custom path mappings. To import components or files, use the `@` prefix.

```tsx
import { Button } from '@/components/Button';
// To import images or other files from the public folder
import avatar from '@/public/avatar.png';
```

### Switch to Yarn/npm

This starter uses pnpm by default, but this choice is yours. If you'd like to switch to Yarn/npm, delete the `yarn.lock` file, install the dependencies with Yarn/npm, change the CI workflow, and Husky Git hooks to use Yarn/npm commands.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for more information.

## 🎃 Recent Development Preview (Updated every 24-h)

![Krakenmaze-Cryptocurrency-Prices-Charts-and-Market-Overview](https://user-images.githubusercontent.com/69587933/192123379-517aa931-1813-4403-9771-fa3acc1dc4cc.png)





[1]: https://cryptoscapes.org
[2]: https://https://redux.js.org/
[3]: https://atomicdesign.bradfrost.com/chapter-2/#:~:text=Atomic%20design%20is%20atoms%2C%20molecules,parts%20at%20the%20same%20time.
[4]: https://cryptoscapes.org/trends
[5]: https://www.coingecko.com/
[6]: https://ethgasstation.info/
[7]: https://alternative.me/
[8]: https://www.blockchain.com/
[9]: https://github.com/leonardtng/cryptoscapes/projects/1
[10]: https://leonardtng.com
