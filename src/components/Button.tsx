import { ComponentChildren, h, VNode } from "preact";
import { css } from "@linaria/core";
// import { lighten, modularScale, hiDPI } from "polished";

interface Props {
  children?: ComponentChildren;
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * If `true`, no elevation is used.
   * @default false
   */
  disableElevation?: boolean;
  /**
   * If `true`, the  keyboard focus ripple is disabled.
   * @default false
   */
  disableFocusRipple?: boolean;
  /**
   * Element placed after the children.
   */
  endIcon?: VNode;
  /**
   * If `true`, the button will take up the full width of its container.
   * @default false
   */
  fullWidth?: boolean;
  /**
   * The URL to link to when the button is clicked.
   * If defined, an `a` element will be used as the root node.
   */
  href?: string;
  /**
   * The size of the component.
   * `small` is equivalent to the dense button styling.
   * @default 'medium'
   */
  size?: "small" | "medium" | "large";
  /**
   * Element placed before the children.
   */
  startIcon?: VNode;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  // sx?: SxProps<Theme>;
  /**
   * The variant to use.
   * @default 'text'
   */
  variant?: "contained" | "outlined" | "text";

  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'primary'
   */
  color?: // | "inherit"
  "primary" | "secondary" | "success" | "error" | "info" | "warning";
}

const buttonBase = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-sizing: border-box;
  background-color: transparent;
  outline: 0;
  border: 0;
  margin: 0;
  border-radius: 0;
  padding: 0;
  cursor: pointer;
  user-select: none;
  vertical-align: middle;
  text-decoration: none;
  color: inherit;
`;

import { darken, lighten } from "polished";

import common from "../colors/common";
import grey from "../colors/grey";
import purple from "../colors/purple";
import red from "../colors/red";
import orange from "../colors/orange";
import blue from "../colors/blue";
import lightBlue from "../colors/lightBlue";
import green from "../colors/green";
import { alpha, getContrastRatio } from "../colors/colorManipulator";

function round(value: number): number {
  return Math.round(value * 1e5) / 1e5;
}
const fontSize = 14;
const htmlFontSize = 16;
const coef = fontSize / 14;
function pxToRem(size: number): string {
  return `${(size / htmlFontSize) * coef}rem`;
}

const ripple = css`
  background-position: center;

  transition: background 0.5s;
  &:hover {
    background: #47a7f5 radial-gradient(circle, transparent 1%, #47a7f5 1%)
      center/15000%;
  }
  &:active {
    background-color: #6eb9f7;
    background-size: 100%;
    transition: background 0s;
  }
`;

const theme = createTheme();

const button = css`
  min-width: 64px;
  &:hover {
    text-decoration: none;
    background-color: var(--text-primary-alpha-opacity);
    @media (hover: none) {
      background-color: transparent;
    }
  }
  &:disabled {
    color: ${theme.palette.action.disabled};
  }
`;

const colorVariant = {
  outlined: css`
    color: var(--color-main);
    border: 1px solid var(--color-main-alpha-half);
    &:hover {
      border: 1px solid var(--color-main);
      background-color: var(--color-main-alpha-opacity);
    }
    &:disabled {
      border: 1px solid ${theme.palette.action.disabledBackground};
    }
  `,
  contained: css`
    color: var(--color-contrastText);
    background-color: var(--color-main);
    box-shadow: ${theme.shadows[2]};
    &:hover {
      background-color: var(--color-dark);
    }
    &:active {
      box-shadow: ${theme.shadows[8]};
    }
    &:focus-visible {
      box-shadow: ${theme.shadows[6]};
    }
    &:disabled {
      color: ${theme.palette.action.disabled};
      box-shadow: ${theme.shadows[0]};
      background-color: ${theme.palette.action.disabledBackground};
    }
  `,
  text: css`
    color: var(--color-main);
    &:hover {
      background-color: var(--color-main-alpha-opacity);
    }
  `,
};

const sizeVariant = {
  outlined: {
    small: css`
      padding: 3px 9px;
      font-size: ${theme.pxToRem(13)};
    `,
    medium: css`
      padding: 5px 15px;
    `,
    large: css`
      padding: 7px 21px;
      font-size: ${theme.pxToRem(15)};
    `,
  },
  contained: {
    small: css`
      padding: 4px 10px;
      font-size: ${theme.pxToRem(13)};
    `,
    medium: css`
      padding: 6px 16px;
    `,
    large: css`
      padding: 8px 22px;
      font-size: ${theme.pxToRem(15)};
    `,
  },
  text: {
    small: css`
      padding: 4px 5px;
      font-size: ${theme.pxToRem(13)};
    `,
    medium: css`
      padding: 6px 8px;
    `,
    large: css`
      padding: 8px 11px;
      font-size: ${theme.pxToRem(15)};
    `,
  },
};

export function Button({
  children,
  disabled,
  startIcon: sip,
  endIcon: eip,
  variant = "text",
  size = "medium",
  color = "primary",
}: Props): VNode {
  //   background-color: var(--text-primary-alpha-opacity);
  //     background-color: var(--color-dark);
  const style = css`
    user-select: none;
    width: 1em;
    height: 1em;
    display: inline-block;
    fill: currentColor;
    flex-shrink: 0;
    transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

    & > svg {
      font-size: 20;
    }
  `;

  const startIcon = sip && (
    <span
      class={[
        css`
          margin-right: 8px;
          margin-left: -4px;
        `,
        style,
      ].join(" ")}
    >
      {sip}
    </span>
  );
  const endIcon = eip && (
    <span
      class={[
        css`
          margin-left: 8px;
          margin-right: -4px;
        `,
        style,
      ].join(" ")}
    >
      {eip}
    </span>
  );
  return (
    <button
      disabled={disabled}
      class={[
        theme.typography.button,
        theme.shape,
        ripple,
        buttonBase,
        button,
        colorVariant[variant],
        sizeVariant[variant][size],
      ].join(" ")}
      style={{
        "--color-main": theme.palette[color].main,
        "--color-main-alpha-half": alpha(theme.palette[color].main, 0.5),
        "--color-contrastText": theme.palette[color].contrastText,
        "--color-dark": theme.palette[color].dark,
        "--color-main-alpha-opacity": alpha(
          theme.palette[color].main,
          theme.palette.action.hoverOpacity,
        ),
        "--text-primary-alpha-opacity": alpha(
          theme.palette.text.primary,
          theme.palette.action.hoverOpacity,
        ),
      }}
    >
      {startIcon}
      {children}
      {endIcon}
    </button>
  );
}

function createTheme() {
  const light = {
    // The colors used to style the text.
    text: {
      // The most important text.
      primary: "rgba(0, 0, 0, 0.87)",
      // Secondary text.
      secondary: "rgba(0, 0, 0, 0.6)",
      // Disabled text have even lower visual prominence.
      disabled: "rgba(0, 0, 0, 0.38)",
    },
    // The color used to divide different elements.
    divider: "rgba(0, 0, 0, 0.12)",
    // The background colors used to style the surfaces.
    // Consistency between these values is important.
    background: {
      paper: common.white,
      default: common.white,
    },
    // The colors used to style the action elements.
    action: {
      // The color of an active action like an icon button.
      active: "rgba(0, 0, 0, 0.54)",
      // The color of an hovered action.
      hover: "rgba(0, 0, 0, 0.04)",
      hoverOpacity: 0.04,
      // The color of a selected action.
      selected: "rgba(0, 0, 0, 0.08)",
      selectedOpacity: 0.08,
      // The color of a disabled action.
      disabled: "rgba(0, 0, 0, 0.26)",
      // The background color of a disabled action.
      disabledBackground: "rgba(0, 0, 0, 0.12)",
      disabledOpacity: 0.38,
      focus: "rgba(0, 0, 0, 0.12)",
      focusOpacity: 0.12,
      activatedOpacity: 0.12,
    },
  };

  const dark = {
    text: {
      primary: common.white,
      secondary: "rgba(255, 255, 255, 0.7)",
      disabled: "rgba(255, 255, 255, 0.5)",
      icon: "rgba(255, 255, 255, 0.5)",
    },
    divider: "rgba(255, 255, 255, 0.12)",
    background: {
      paper: "#121212",
      default: "#121212",
    },
    action: {
      active: common.white,
      hover: "rgba(255, 255, 255, 0.08)",
      hoverOpacity: 0.08,
      selected: "rgba(255, 255, 255, 0.16)",
      selectedOpacity: 0.16,
      disabled: "rgba(255, 255, 255, 0.3)",
      disabledBackground: "rgba(255, 255, 255, 0.12)",
      disabledOpacity: 0.38,
      focus: "rgba(255, 255, 255, 0.12)",
      focusOpacity: 0.12,
      activatedOpacity: 0.24,
    },
  };

  const defaultFontFamily = '"Roboto", "Helvetica", "Arial", sans-serif';

  const shadowKeyUmbraOpacity = 0.2;
  const shadowKeyPenumbraOpacity = 0.14;
  const shadowAmbientShadowOpacity = 0.12;

  const typography = createTypography({});
  const palette = createPalette({});
  const shadows = createAllShadows();
  const transitions = createTransitions({});
  const breakpoints = createBreakpoints({});
  const shape = css`
    border-radius: 4px;
  `;
  /////////////////////
  ///////////////////// BREAKPOINTS
  /////////////////////

  function createBreakpoints(breakpoints: any) {
    const {
      // The breakpoint **start** at this value.
      // For instance with the first breakpoint xs: [xs, sm).
      values = {
        xs: 0, // phone
        sm: 600, // tablet
        md: 900, // small laptop
        lg: 1200, // desktop
        xl: 1536, // large screen
      },
      unit = "px",
      step = 5,
      // ...other
    } = breakpoints;

    const keys = Object.keys(values);

    function up(key: any) {
      const value = typeof values[key] === "number" ? values[key] : key;
      return `@media (min-width:${value}${unit})`;
    }

    function down(key: any) {
      const value = typeof values[key] === "number" ? values[key] : key;
      return `@media (max-width:${value - step / 100}${unit})`;
    }

    function between(start: any, end: any) {
      const endIndex = keys.indexOf(end);

      return (
        `@media (min-width:${
          typeof values[start] === "number" ? values[start] : start
        }${unit}) and ` +
        `(max-width:${
          (endIndex !== -1 && typeof values[keys[endIndex]] === "number"
            ? values[keys[endIndex]]
            : end) -
          step / 100
        }${unit})`
      );
    }

    function only(key: any) {
      if (keys.indexOf(key) + 1 < keys.length) {
        return between(key, keys[keys.indexOf(key) + 1]);
      }

      return up(key);
    }

    function not(key: any) {
      // handle first and last key separately, for better readability
      const keyIndex = keys.indexOf(key);
      if (keyIndex === 0) {
        return up(keys[1]);
      }
      if (keyIndex === keys.length - 1) {
        return down(keys[keyIndex]);
      }

      return between(key, keys[keys.indexOf(key) + 1]).replace(
        "@media",
        "@media not all and",
      );
    }

    return {
      keys,
      values,
      up,
      down,
      between,
      only,
      not,
      unit,
      // ...other,
    };
  }

  /////////////////////
  ///////////////////// SHADOWS
  /////////////////////

  function createShadow(...px: number[]): string {
    return [
      `${px[0]}px ${px[1]}px ${px[2]}px ${px[3]}px rgba(0,0,0,${shadowKeyUmbraOpacity})`,
      `${px[4]}px ${px[5]}px ${px[6]}px ${px[7]}px rgba(0,0,0,${shadowKeyPenumbraOpacity})`,
      `${px[8]}px ${px[9]}px ${px[10]}px ${px[11]}px rgba(0,0,0,${shadowAmbientShadowOpacity})`,
    ].join(",");
  }

  function createAllShadows() {
    // Values from https://github.com/material-components/material-components-web/blob/be8747f94574669cb5e7add1a7c54fa41a89cec7/packages/mdc-elevation/_variables.scss
    return [
      "none",
      createShadow(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0),
      createShadow(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0),
      createShadow(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0),
      createShadow(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0),
      createShadow(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0),
      createShadow(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0),
      createShadow(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1),
      createShadow(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2),
      createShadow(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2),
      createShadow(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3),
      createShadow(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3),
      createShadow(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4),
      createShadow(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4),
      createShadow(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4),
      createShadow(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5),
      createShadow(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5),
      createShadow(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5),
      createShadow(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6),
      createShadow(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6),
      createShadow(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7),
      createShadow(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7),
      createShadow(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7),
      createShadow(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8),
      createShadow(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8),
    ];
  }

  /////////////////////
  ///////////////////// TYPOGRAPHY
  /////////////////////

  /**
   * @see @link{https://material.io/design/typography/the-type-system.html}
   * @see @link{https://material.io/design/typography/understanding-typography.html}
   */
  function createTypography(typography: any) {
    // const {
    const fontFamily = defaultFontFamily,
      // The default font size of the Material Specification.
      fontSize = 14, // px
      fontWeightLight = 300,
      fontWeightRegular = 400,
      fontWeightMedium = 500,
      fontWeightBold = 700,
      // Tell MUI what's the font-size on the html element.
      // 16px is the default font-size used by browsers.
      htmlFontSize = 16;
    // Apply the CSS properties to all the variants.
    // allVariants,
    // pxToRem: pxToRem2,
    // ...other
    // } = typography;

    const variants = {
      // h1: buildVariant(fontWeightLight, 96, 1.167, -1.5),
      // h2: buildVariant(fontWeightLight, 60, 1.2, -0.5),
      // h3: buildVariant(fontWeightRegular, 48, 1.167, 0),
      // h4: buildVariant(fontWeightRegular, 34, 1.235, 0.25),
      // h5: buildVariant(fontWeightRegular, 24, 1.334, 0),
      // h6: buildVariant(fontWeightMedium, 20, 1.6, 0.15),
      // subtitle1: buildVariant(fontWeightRegular, 16, 1.75, 0.15),
      // subtitle2: buildVariant(fontWeightMedium, 14, 1.57, 0.1),
      // body1: buildVariant(fontWeightRegular, 16, 1.5, 0.15),
      // body2: buildVariant(fontWeightRegular, 14, 1.43, 0.15),
      button: css`
        font-family: "Roboto", "Helvetica", "Arial", sans-serif;
        font-weight: ${fontWeightMedium};
        font-size: ${pxToRem(14)};
        line-height: 1.75;
        letter-spacing: ${round(0.4 / 14)}em;
        text-transform: uppercase;
      `,
      // button: buildVariant(fontWeightMedium, 14, 1.75, 0.4, caseAllCaps),
      // caption: buildVariant(fontWeightRegular, 12, 1.66, 0.4),
      // overline: buildVariant(fontWeightRegular, 12, 2.66, 1, caseAllCaps),
    };

    return deepmerge(
      {
        htmlFontSize,
        pxToRem,
        fontFamily,
        fontSize,
        fontWeightLight,
        fontWeightRegular,
        fontWeightMedium,
        fontWeightBold,
        ...variants,
      },
      // other,
      {
        clone: false, // No need to clone deep
      },
    );
  }

  /////////////////////
  ///////////////////// MIXINS
  /////////////////////

  function createMixins(breakpoints: any, spacing: any, mixins: any) {
    return {
      toolbar: {
        minHeight: 56,
        [`${breakpoints.up("xs")} and (orientation: landscape)`]: {
          minHeight: 48,
        },
        [breakpoints.up("sm")]: {
          minHeight: 64,
        },
      },
      ...mixins,
    };
  }

  /////////////////////
  ///////////////////// TRANSITION
  /////////////////////

  function formatMs(milliseconds: number) {
    return `${Math.round(milliseconds)}ms`;
  }

  function getAutoHeightDuration(height: number) {
    if (!height) {
      return 0;
    }

    const constant = height / 36;

    // https://www.wolframalpha.com/input/?i=(4+%2B+15+*+(x+%2F+36+)+**+0.25+%2B+(x+%2F+36)+%2F+5)+*+10
    return Math.round((4 + 15 * constant ** 0.25 + constant / 5) * 10);
  }

  function createTransitions(inputTransitions: any) {
    // Follow https://material.google.com/motion/duration-easing.html#duration-easing-natural-easing-curves
    // to learn the context in which each easing should be used.
    const easing = {
      // This is the most common easing curve.
      easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
      // Objects enter the screen at full velocity from off-screen and
      // slowly decelerate to a resting point.
      easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
      // Objects leave the screen at full velocity. They do not decelerate when off-screen.
      easeIn: "cubic-bezier(0.4, 0, 1, 1)",
      // The sharp curve is used by objects that may return to the screen at any time.
      sharp: "cubic-bezier(0.4, 0, 0.6, 1)",
    };

    // Follow https://material.io/guidelines/motion/duration-easing.html#duration-easing-common-durations
    // to learn when use what timing
    const duration = {
      shortest: 150,
      shorter: 200,
      short: 250,
      // most basic recommended timing
      standard: 300,
      // this is to be used in complex animations
      complex: 375,
      // recommended when something is entering screen
      enteringScreen: 225,
      // recommended when something is leaving screen
      leavingScreen: 195,
    };

    const mergedEasing = {
      ...easing,
      ...inputTransitions.easing,
    };

    const mergedDuration = {
      ...duration,
      ...inputTransitions.duration,
    };

    const create = (props = ["all"], options = {} as any) => {
      const {
        duration: durationOption = mergedDuration.standard,
        easing: easingOption = mergedEasing.easeInOut,
        delay = 0,
        // ...other
      } = options;

      return (Array.isArray(props) ? props : [props])
        .map(
          (animatedProp) =>
            `${animatedProp} ${
              typeof durationOption === "string"
                ? durationOption
                : formatMs(durationOption)
            } ${easingOption} ${
              typeof delay === "string" ? delay : formatMs(delay)
            }`,
        )
        .join(",");
    };

    return {
      getAutoHeightDuration,
      create,
      ...inputTransitions,
      easing: mergedEasing,
      duration: mergedDuration,
    };
  }

  /////////////////////
  ///////////////////// PALETTE
  /////////////////////

  function createPalette(palette: any) {
    const {
      mode = "light",
      contrastThreshold = 3,
      tonalOffset = 0.2,
      // ...other
    } = palette;

    const primary = palette.primary || getDefaultPrimary(mode);
    const secondary = palette.secondary || getDefaultSecondary(mode);
    const error = palette.error || getDefaultError(mode);
    const info = palette.info || getDefaultInfo(mode);
    const success = palette.success || getDefaultSuccess(mode);
    const warning = palette.warning || getDefaultWarning(mode);

    // Use the same logic as
    // Bootstrap: https://github.com/twbs/bootstrap/blob/1d6e3710dd447de1a200f29e8fa521f8a0908f70/scss/_functions.scss#L59
    // and material-components-web https://github.com/material-components/material-components-web/blob/ac46b8863c4dab9fc22c4c662dc6bd1b65dd652f/packages/mdc-theme/_functions.scss#L54
    function getContrastText(background: string): string {
      const contrastText =
        getContrastRatio(background, dark.text.primary) >= contrastThreshold
          ? dark.text.primary
          : light.text.primary;

      return contrastText;
    }

    const augmentColor = ({
      color,
      name,
      mainShade = 500,
      lightShade = 300,
      darkShade = 700,
    }: any) => {
      color = { ...color };
      if (!color.main && color[mainShade]) {
        color.main = color[mainShade];
      }

      addLightOrDark(color, "light", lightShade, tonalOffset);
      addLightOrDark(color, "dark", darkShade, tonalOffset);
      if (!color.contrastText) {
        color.contrastText = getContrastText(color.main);
      }

      return color;
    };

    const modes = { dark, light };

    // if (process.env.NODE_ENV !== "production") {
    //   if (!modes[mode]) {
    //     console.error(`MUI: The palette mode \`${mode}\` is not supported.`);
    //   }
    // }

    const paletteOutput = deepmerge(
      {
        // A collection of common colors.
        common,
        // The palette mode, can be light or dark.
        mode,
        // The colors used to represent primary interface elements for a user.
        primary: augmentColor({ color: primary, name: "primary" }),
        // The colors used to represent secondary interface elements for a user.
        secondary: augmentColor({
          color: secondary,
          name: "secondary",
          mainShade: "A400",
          lightShade: "A200",
          darkShade: "A700",
        }),
        // The colors used to represent interface elements that the user should be made aware of.
        error: augmentColor({ color: error, name: "error" }),
        // The colors used to represent potentially dangerous actions or important messages.
        warning: augmentColor({ color: warning, name: "warning" }),
        // The colors used to present information to the user that is neutral and not necessarily important.
        info: augmentColor({ color: info, name: "info" }),
        // The colors used to indicate the successful completion of an action that user triggered.
        success: augmentColor({ color: success, name: "success" }),
        // The grey colors.
        grey,
        // Used by `getContrastText()` to maximize the contrast between
        // the background and the text.
        contrastThreshold,
        // Takes a background color and returns the text color that maximizes the contrast.
        getContrastText,
        // Generate a rich color object.
        augmentColor,
        // Used by the functions below to shift a color's luminance by approximately
        // two indexes within its tonal palette.
        // E.g., shift from Red 500 to Red 300 or Red 700.
        tonalOffset,
        // The light and dark mode object.
        ...modes[mode as "light" | "dark"],
      },
      // other:
      {},
    );

    return paletteOutput;
  }

  function addLightOrDark(
    intent: any,
    direction: any,
    shade: any,
    tonalOffset: any,
  ): void {
    const tonalOffsetLight = tonalOffset.light || tonalOffset;
    const tonalOffsetDark = tonalOffset.dark || tonalOffset * 1.5;

    if (!intent[direction]) {
      if (intent.hasOwnProperty(shade)) {
        intent[direction] = intent[shade];
      } else if (direction === "light") {
        intent.light = lighten(intent.main, tonalOffsetLight);
      } else if (direction === "dark") {
        intent.dark = darken(intent.main, tonalOffsetDark);
      }
    }
  }

  function getDefaultPrimary(mode = "light") {
    if (mode === "dark") {
      return {
        main: blue[200],
        light: blue[50],
        dark: blue[400],
      };
    }
    return {
      main: blue[700],
      light: blue[400],
      dark: blue[800],
    };
  }

  function getDefaultSecondary(mode = "light") {
    if (mode === "dark") {
      return {
        main: purple[200],
        light: purple[50],
        dark: purple[400],
      };
    }
    return {
      main: purple[500],
      light: purple[300],
      dark: purple[700],
    };
  }

  function getDefaultError(mode = "light") {
    if (mode === "dark") {
      return {
        main: red[500],
        light: red[300],
        dark: red[700],
      };
    }
    return {
      main: red[700],
      light: red[400],
      dark: red[800],
    };
  }

  function getDefaultInfo(mode = "light") {
    if (mode === "dark") {
      return {
        main: lightBlue[400],
        light: lightBlue[300],
        dark: lightBlue[700],
      };
    }
    return {
      main: lightBlue[700],
      light: lightBlue[500],
      dark: lightBlue[900],
    };
  }

  function getDefaultSuccess(mode = "light") {
    if (mode === "dark") {
      return {
        main: green[400],
        light: green[300],
        dark: green[700],
      };
    }
    return {
      main: green[800],
      light: green[500],
      dark: green[900],
    };
  }

  function getDefaultWarning(mode = "light") {
    if (mode === "dark") {
      return {
        main: orange[400],
        light: orange[300],
        dark: orange[700],
      };
    }
    return {
      main: "#ed6c02", // closest to orange[800] that pass 3:1.
      light: orange[500],
      dark: orange[900],
    };
  }

  /////////////////////
  ///////////////////// DEEP MERGE
  /////////////////////

  function isPlainObject(item: unknown): item is Record<keyof any, unknown> {
    return (
      item !== null && typeof item === "object" && item.constructor === Object
    );
  }

  interface DeepmergeOptions {
    clone?: boolean;
  }

  function deepmerge<T>(
    target: T,
    source: unknown,
    options: DeepmergeOptions = { clone: true },
  ): T {
    const output = options.clone ? { ...target } : target;

    if (isPlainObject(target) && isPlainObject(source)) {
      Object.keys(source).forEach((key) => {
        // Avoid prototype pollution
        if (key === "__proto__") {
          return;
        }

        if (
          isPlainObject(source[key]) &&
          key in target &&
          isPlainObject(target[key])
        ) {
          // Since `output` is a clone of `target` and we have narrowed `target` in this block we can cast to the same type.
          (output as Record<keyof any, unknown>)[key] = deepmerge(
            target[key],
            source[key],
            options,
          );
        } else {
          (output as Record<keyof any, unknown>)[key] = source[key];
        }
      });
    }

    return output;
  }
  return {
    typography,
    palette,
    shadows,
    shape,
    transitions,
    breakpoints,
    pxToRem,
  };
}
