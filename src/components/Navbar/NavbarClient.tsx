'use client'

import * as React from 'react'
import Link from 'next/link'
import { cn } from '@/utilities/ui'
import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { Search } from 'lucide-react'
import { Logo, LogoText } from '@/components/Logo/Logo'
import { useTheme } from '@/providers/Theme'
import { CMSLink } from '@/components/Link'

import type { Header } from '@/payload-types'

interface NavbarClientProps {
  data: Header
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'> & {
    title: string
    description?: string
  }
>(({ className, title, children, description, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-muted/50 hover:text-foreground focus:bg-muted/50 focus:text-foreground bg-transparent',
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          {description && (
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {description}
            </p>
          )}
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = 'ListItem'

export function NavbarClient({ data }: NavbarClientProps) {
  const { theme } = useTheme()
  
  // Debug: Log the data to see what we're receiving
  console.log('NavbarClient data:', data)
  console.log('NavbarClient navItems:', data.navItems)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        {/* Logo */}
        <div className="mr-6 flex items-center">
          <Link className="flex items-center space-x-2" href="/">
            <Logo color={theme === 'dark' ? 'light' : 'dark'} loading="eager" priority="high" className="h-8 w-8" />
            <LogoText color={theme === 'dark' ? 'light' : 'dark'} className="font-bold" />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <NavigationMenu className="flex">
          <NavigationMenuList>
            {!data.navItems || data.navItems.length === 0 ? (
              <NavigationMenuItem>
                <span className="text-sm text-muted-foreground">No hay elementos de navegación configurados</span>
              </NavigationMenuItem>
            ) : (
              data.navItems.map((navItem: any, index: number) => {
              // Handle direct link items
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

              // Handle navigation items with potential dropdowns
              if (navItem.navigationItem) {
                if (navItem.navigationItem.type === 'dropdown') {
                  return (
                    <NavigationMenuItem key={navItem.id || index}>
                      <NavigationMenuTrigger>{navItem.navigationItem.label}</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                          {navItem.navigationItem.dropdownItems?.map((dropdownItem: any, dropdownIndex: number) => (
                            <ListItem
                              key={dropdownIndex}
                              title={dropdownItem.label}
                              description={dropdownItem.description}
                              href={dropdownItem.link?.reference?.value?.slug ? `/${dropdownItem.link.reference.relationTo}/${dropdownItem.link.reference.value.slug}` : dropdownItem.link?.url || '#'}
                            />
                          ))}
                        </ul>
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
            })
            )}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Search Button */}
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/search">
                <Search className="h-4 w-4" />
                <span className="sr-only">Buscar</span>
              </Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  )
}
