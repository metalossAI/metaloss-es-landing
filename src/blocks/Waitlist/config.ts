import { Block } from "payload";

export const WaitlistCountBlock: Block = {
  slug: "waitlist",
  interfaceName: "WaitlistCountBlock",
  fields: [
    {
      name: "title",
      type: "textarea",
    },
    {
      name: "subtitle",
      type: "textarea",
    },
    {
      name: "id",
      type: "text",
      defaultValue: "waitlist",
    }
  ],
  graphQL: {
    singularName: "WaitlistCountBlock",
  },
  labels: {
    plural: "Waitlist Count Blocks",
    singular: "Waitlist Count Block",
  },
};
