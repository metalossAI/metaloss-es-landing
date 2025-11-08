'use client'

import type { Header } from '@/payload-types'
import Link from 'next/link'
import React from 'react'
import { ChevronDown, ExternalLink, SearchIcon } from 'lucide-react'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { CMSLink } from '@/components/Link'
import { cn } from '@/utilities/ui'
import { Button } from '@/components/ui/button'

interface ProfessionalNavbarProps {
  data: any
  onNavClick?: () => void
}

// Helper component for dropdown items
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & {
    title: string
    description?: string
    href: string
    external?: boolean
  }
>(({ className, title, description, href, external, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          href={href}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          {...props}
        >
          <div className="flex items-center gap-2 text-sm font-medium leading-none">
            {title}
            {external && <ExternalLink className="h-3 w-3" />}
          </div>
          {description && (
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {description}
            </p>
          )}
        </Link>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

export const ProfessionalNavbar: React.FC<ProfessionalNavbarProps> = ({ data, onNavClick }) => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {data.navItems?.map((navItem: any, index: number) => {
          // Handle the actual data structure where navItem has direct link property
          if (navItem.link) {
            return (
              <NavigationMenuItem key={navItem.id || index}>
                <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
                  <CMSLink
                    type={navItem.link.type}
                    url={navItem.link.url}
                    reference={navItem.link.reference}
                    newTab={navItem.link.newTab}
                    className={navigationMenuTriggerStyle()}
                  >
                    {navItem.link.label}
                  </CMSLink>
                </NavigationMenuLink>
              </NavigationMenuItem>
            )
          }

          // Handle the expected structure with navigationItem
          if (navItem.navigationItem) {
            if (navItem.navigationItem.type === 'dropdown') {
              return (
                <NavigationMenuItem key={navItem.id || index}>
                  <NavigationMenuTrigger>{navItem.navigationItem.label}</NavigationMenuTrigger>
                  <NavigationMenuContent className="z-[100] navigation-menu-content">
                    <div className="flex flex-col w-[240px] max-w-[calc(100vw-2rem)] min-w-0 gap-1 p-4 rounded-xl border border-border/20 bg-background/95 backdrop-blur-md shadow-2xl overflow-hidden box-border">
                      {navItem.navigationItem.dropdownItems?.map((dropdownItem: any, dropdownIndex: number) => {
                        console.log('Rendering dropdown item:', dropdownItem)
                        return (
                          <Link
                            key={dropdownIndex}
                            href={dropdownItem.link?.reference?.value?.slug ? `/${dropdownItem.link.reference.relationTo}/${dropdownItem.link.reference.value.slug}` : dropdownItem.link?.url || '#'}
                            className="block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-all duration-200 hover:bg-muted/50 hover:text-foreground focus:bg-muted/50 focus:text-foreground break-words overflow-hidden text-ellipsis"
                            onClick={onNavClick}
                          >
                            <div className="text-sm font-medium leading-none truncate">{dropdownItem.label}</div>
                            {dropdownItem.description && (
                              <div className="line-clamp-2 text-sm leading-snug text-muted-foreground break-words">
                                {dropdownItem.description}
                              </div>
                            )}
                          </Link>
                        )
                      })}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              )
            }

            if (navItem.navigationItem.type === 'link') {
              return (
                <NavigationMenuItem key={navItem.id || index}>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
                    <CMSLink
                      type={navItem.navigationItem.link?.type}
                      url={navItem.navigationItem.link?.url}
                      reference={navItem.navigationItem.link?.reference}
                      newTab={navItem.navigationItem.link?.newTab}
                      className={navigationMenuTriggerStyle()}
                    >
                      {navItem.navigationItem.label}
                    </CMSLink>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              )
            }
          }

          return null
        })}

        {/* Search Button */}
        <NavigationMenuItem>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/search" onClick={onNavClick}>
              <SearchIcon className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Link>
          </Button>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
