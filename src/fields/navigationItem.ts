import type { Field, GroupField } from 'payload'

import deepMerge from '@/utilities/deepMerge'

export type NavigationItemType = 'link' | 'dropdown'

export type NavigationAppearances = 'default' | 'outline'

export const navigationAppearanceOptions: Record<NavigationAppearances, { label: string; value: string }> = {
  default: {
    label: 'Default',
    value: 'default',
  },
  outline: {
    label: 'Outline',
    value: 'outline',
  },
}

type NavigationItemTypeField = (options?: {
  appearances?: NavigationAppearances[] | false
  overrides?: Partial<GroupField>
}) => Field

export const navigationItem: NavigationItemTypeField = ({ appearances, overrides = {} } = {}) => {
  const navigationItemResult: GroupField = {
    name: 'navigationItem',
    type: 'group',
    admin: {
      hideGutter: true,
    },
    fields: [
      {
        name: 'type',
        type: 'radio',
        admin: {
          layout: 'horizontal',
          width: '50%',
        },
        defaultValue: 'link',
        options: [
          {
            label: 'Simple Link',
            value: 'link',
          },
          {
            label: 'Dropdown Menu',
            value: 'dropdown',
          },
        ],
      },
      {
        name: 'label',
        type: 'text',
        admin: {
          width: '50%',
        },
        label: 'Label',
        required: true,
      },
    ],
  }

  const linkFields: Field[] = [
    {
      name: 'link',
      type: 'group',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'link',
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'type',
              type: 'radio',
              admin: {
                layout: 'horizontal',
                width: '50%',
              },
              defaultValue: 'reference',
              options: [
                {
                  label: 'Internal link',
                  value: 'reference',
                },
                {
                  label: 'Custom URL',
                  value: 'custom',
                },
              ],
            },
            {
              name: 'newTab',
              type: 'checkbox',
              admin: {
                style: {
                  alignSelf: 'flex-end',
                },
                width: '50%',
              },
              label: 'Open in new tab',
            },
          ],
        },
        {
          name: 'reference',
          type: 'relationship',
          admin: {
            condition: (_, siblingData) => siblingData?.link?.type === 'reference',
          },
          label: 'Document to link to',
          relationTo: ['pages', 'posts'],
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          admin: {
            condition: (_, siblingData) => siblingData?.link?.type === 'custom',
          },
          label: 'Custom URL',
          required: true,
        },
      ],
    },
  ]

  const dropdownFields: Field[] = [
    {
      name: 'dropdownItems',
      type: 'array',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'dropdown',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Item Label',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
          admin: {
            description: 'Optional description for the dropdown item',
          },
        },
        {
          name: 'link',
          type: 'group',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'type',
                  type: 'radio',
                  admin: {
                    layout: 'horizontal',
                    width: '50%',
                  },
                  defaultValue: 'reference',
                  options: [
                    {
                      label: 'Internal link',
                      value: 'reference',
                    },
                    {
                      label: 'Custom URL',
                      value: 'custom',
                    },
                  ],
                },
                {
                  name: 'newTab',
                  type: 'checkbox',
                  admin: {
                    style: {
                      alignSelf: 'flex-end',
                    },
                    width: '50%',
                  },
                  label: 'Open in new tab',
                },
              ],
            },
            {
              name: 'reference',
              type: 'relationship',
              admin: {
                condition: (_, siblingData) => siblingData?.type === 'reference',
              },
              label: 'Document to link to',
              relationTo: ['pages', 'posts'],
              required: true,
            },
            {
              name: 'url',
              type: 'text',
              admin: {
                condition: (_, siblingData) => siblingData?.type === 'custom',
              },
              label: 'Custom URL',
              required: true,
            },
          ],
        },
      ],
      label: 'Dropdown Items',
      minRows: 1,
    },
  ]

  navigationItemResult.fields = [...navigationItemResult.fields, ...linkFields, ...dropdownFields]

  if (appearances !== false) {
    let appearanceOptionsToUse = [navigationAppearanceOptions.default, navigationAppearanceOptions.outline]

    if (appearances) {
      appearanceOptionsToUse = appearances.map((appearance) => navigationAppearanceOptions[appearance])
    }

    navigationItemResult.fields.push({
      name: 'appearance',
      type: 'select',
      admin: {
        description: 'Choose how the navigation item should be rendered.',
      },
      defaultValue: 'default',
      options: appearanceOptionsToUse,
    })
  }

  return deepMerge(navigationItemResult, overrides)
}
