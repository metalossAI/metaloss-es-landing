import type { Block } from "payload";

const BentoGridBlock: Block = {
  slug: "bentoGridBlock",
  labels: {
    singular: "Bento Grid",
    plural: "Bento Grids",
  },
  fields: [
    {
      name: "items",
      type: "array",
      label: "Grid Items",
      required: true,
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "description",
          type: "textarea",
        },
        {
          name: "icon",
          type: "text", // Or use select if you want to restrict icons
          label: "Icon Name",
        },
        {
          name: "headerType",
          type: "select",
          options: [
            { label: "Skeleton One", value: "skeletonOne" },
            { label: "Skeleton Two", value: "skeletonTwo" },
            { label: "Skeleton Three", value: "skeletonThree" },
            { label: "Skeleton Four", value: "skeletonFour" },
            { label: "Skeleton Five", value: "skeletonFive" },
          ],
          label: "Header Type",
        },
        {
          name: "className",
          type: "text",
          label: "Extra CSS Classes",
        },
      ],
    },
    {
      name: "className",
      type: "text",
      label: "Grid CSS Classes",
    },
  ],
};

export default BentoGridBlock;
