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
}: {
  name: string;
  variable: string;
}) => (
  <div className="flex flex-col gap-2">
    <div
      className="h-24 w-full rounded-lg border border-border shadow-sm"
      style={{ backgroundColor: `hsl(var(${variable}))` }}
    />
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
  colors: { name: string; variable: string }[];
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
          { name: "Background", variable: "--background" },
          { name: "Foreground", variable: "--foreground" },
        ]}
      />

      <ColorGroup
        title="Primary"
        colors={[
          { name: "Primary", variable: "--primary" },
          { name: "Primary Foreground", variable: "--primary-foreground" },
        ]}
      />

      <ColorGroup
        title="Secondary"
        colors={[
          { name: "Secondary", variable: "--secondary" },
          { name: "Secondary Foreground", variable: "--secondary-foreground" },
        ]}
      />

      <ColorGroup
        title="Muted"
        colors={[
          { name: "Muted", variable: "--muted" },
          { name: "Muted Foreground", variable: "--muted-foreground" },
        ]}
      />

      <ColorGroup
        title="Accent"
        colors={[
          { name: "Accent", variable: "--accent" },
          { name: "Accent Foreground", variable: "--accent-foreground" },
        ]}
      />

      <ColorGroup
        title="Destructive"
        colors={[
          { name: "Destructive", variable: "--destructive" },
          {
            name: "Destructive Foreground",
            variable: "--destructive-foreground",
          },
        ]}
      />

      <ColorGroup
        title="UI Elements"
        colors={[
          { name: "Card", variable: "--card" },
          { name: "Card Foreground", variable: "--card-foreground" },
          { name: "Popover", variable: "--popover" },
          { name: "Popover Foreground", variable: "--popover-foreground" },
          { name: "Border", variable: "--border" },
          { name: "Input", variable: "--input" },
          { name: "Ring", variable: "--ring" },
        ]}
      />
    </div>
  ),
};
