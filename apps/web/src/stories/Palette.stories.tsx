import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "Design System/Palette",
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj;

const ColorSwatch = ({
  name,
  variable,
  hex,
}: {
  name: string;
  variable: string;
  hex: string;
}) => (
  <div className="flex flex-col gap-2">
    <div
      className="h-24 w-full rounded-lg border border-border shadow-sm flex items-center justify-center"
      style={{ backgroundColor: `hsl(var(${variable}))` }}
    >
      <span className="text-m text-black">{hex}</span>
    </div>
    <div className="flex flex-col gap-1">
      <span className="font-medium text-sm">{name}</span>
      <code className="text-xs text-muted-foreground">{variable}</code>
    </div>
  </div>
);

const ColorGroup = ({
  title,
  colors,
}: {
  title: string;
  colors: { name: string; variable: string; hex: string }[];
}) => (
  <div className="flex flex-col gap-4">
    <h3 className="text-lg font-semibold border-b pb-2">{title}</h3>
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
      {colors.map((color) => (
        <ColorSwatch key={color.variable} {...color} />
      ))}
    </div>
  </div>
);

export const Default: Story = {
  render: () => (
    <div className="p-8 flex flex-col gap-12 bg-background text-foreground min-h-screen">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Color Palette</h1>
        <p className="text-muted-foreground">
          Base colors and semantic tokens used throughout the application.
        </p>
      </div>

      <ColorGroup
        title="Base Colors"
        colors={[
          { name: "Background", variable: "--background", hex: "#F0EBE3" },
          { name: "Foreground", variable: "--foreground", hex: "#43312A" },
        ]}
      />

      <ColorGroup
        title="Primary"
        colors={[
          { name: "Primary", variable: "--primary", hex: "#7D5A50" },
          {
            name: "Primary Foreground",
            variable: "--primary-foreground",
            hex: "#F0EBE3",
          },
        ]}
      />

      <ColorGroup
        title="Secondary"
        colors={[
          { name: "Secondary", variable: "--secondary", hex: "#B4846C" },
          {
            name: "Secondary Foreground",
            variable: "--secondary-foreground",
            hex: "#43312A",
          },
        ]}
      />

      <ColorGroup
        title="Muted"
        colors={[
          { name: "Muted", variable: "--muted", hex: "#A0937D" },
          {
            name: "Muted Foreground",
            variable: "--muted-foreground",
            hex: "#43312A",
          },
        ]}
      />

      <ColorGroup
        title="Accent"
        colors={[
          { name: "Accent", variable: "--accent", hex: "#A0937D" },
          {
            name: "Accent Foreground",
            variable: "--accent-foreground",
            hex: "#43312A",
          },
        ]}
      />

      <ColorGroup
        title="Destructive"
        colors={[
          { name: "Destructive", variable: "--destructive", hex: "#EF4444" },
          {
            name: "Destructive Foreground",
            variable: "--destructive-foreground",
            hex: "#F8FAFC",
          },
        ]}
      />

      <ColorGroup
        title="UI Elements"
        colors={[
          { name: "Card", variable: "--card", hex: "#E4DCCF" },
          {
            name: "Card Foreground",
            variable: "--card-foreground",
            hex: "#43312A",
          },
          { name: "Popover", variable: "--popover", hex: "#E4DCCF" },
          {
            name: "Popover Foreground",
            variable: "--popover-foreground",
            hex: "#43312A",
          },
          { name: "Border", variable: "--border", hex: "#A0937D" },
          { name: "Input", variable: "--input", hex: "#A0937D" },
          { name: "Ring", variable: "--ring", hex: "#7D5A50" },
        ]}
      />
    </div>
  ),
};
