'use client'

import React, { ReactNode, useState } from 'react'
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  FlexProps,
  VStack
} from '@chakra-ui/react'
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
} from 'react-icons/fi'
import { IconType } from 'react-icons'
import { ReactText } from 'react'
import GettingStart from './items/start';
import PriceFeed from './items/price';
import CallAPI from './items/api';
  
import GitHubOracles from "@/app/common/github";

interface LinkItemProps {
    name: string
    icon: IconType,
    state: string
  }
const LinkItems: Array<LinkItemProps> = [
    { name: 'Getting Started', icon: FiHome, state: 'start' },
    { name: 'Price Feed', icon: FiTrendingUp, state: 'price' },
    { name: 'API', icon: FiCompass, state: 'api' }
]
  
export default function Documentation() {
    const [state, setState] = useState('start');
    const { isOpen, onOpen, onClose } = useDisclosure()

    const handleChangeState = (value: string) => {
        setState(value);
    }

    return (
      <Box maxW="full" className="body" bg="gray.800">
        <VStack>
            <Flex w={"100%"} justifyContent={"space-between"}>
                <Box minH="100vh">
                    <SidebarContent onClose={() => onClose} setState={handleChangeState} display={{ base: 'none', md: 'block' }} />
                    <Drawer
                        isOpen={isOpen}
                        placement="left"
                        onClose={onClose}
                        returnFocusOnClose={false}
                        onOverlayClick={onClose}
                        size="full"
                    >
                        <DrawerContent>
                            <SidebarContent onClose={onClose} setState={() => setState} />
                        </DrawerContent>
                    </Drawer>
                    {/* mobilenav */}
                    <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
                    <Box ml={{ base: 0, md: 60 }} p="4">
                        {/* Content */}
                    </Box>
                </Box>
                <Box w="100%" padding={16}>
                    {state === 'start' && <GettingStart />}
                    {state === 'price' && <PriceFeed />}
                    {state === 'api' && <CallAPI />}
                </Box>
            </Flex>
        </VStack>
      </Box>
    );
}
  
interface SidebarProps extends BoxProps {
    onClose: () => void,
    setState: (value: string) => void
}
  
const SidebarContent = ({ onClose, setState, ...rest }: SidebarProps) => {
    return (
      <Box
        // bg={useColorModeValue('white', 'gray.900')}
        // borderRight="1px"
        // borderRightColor={useColorModeValue('gray.200', 'gray.700')}
        w={{ base: 'full', md: 60 }}
        // pos="fixed"
        h="full"
        {...rest}>
        <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
          <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold" color={"white"}>
            Documentation
          </Text>
          <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
        </Flex>
        {LinkItems.map((link) => (
          <NavItem key={link.name} icon={link.icon} color={"white"} id={link.state} onClick={(e) => setState((e.target as HTMLElement).id as string)}>
            {link.name}
          </NavItem>
        ))}
      </Box>
    )
}

interface NavItemProps extends FlexProps {
    icon: IconType
    children: ReactText
}
const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
    return (
      <Box
        as="a"
        href="#"
        style={{ textDecoration: 'none' }}
        _focus={{ boxShadow: 'none' }}>
        <Flex
            align="center"
            p="4"
            mx="4"
            borderRadius="lg"
            role="group"
            cursor="pointer"
            _hover={{
                bg: 'cyan.400',
                color: 'white',
            }}
            {...rest}>
            {icon && (
                <Icon
                mr="4"
                fontSize="16"
                _groupHover={{
                    color: 'white',
                }}
                as={icon}
                />
            )}
            {children}
        </Flex>
      </Box>
    )
  }
  
interface MobileProps extends FlexProps {
    onOpen: () => void
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
    return (
      <Flex
        ml={{ base: 0, md: 60 }}
        px={{ base: 4, md: 24 }}
        height="20"
        alignItems="center"
        // bg={useColorModeValue('white', 'gray.900')}
        borderBottomWidth="1px"
        borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
        justifyContent="flex-start"
        {...rest}>
        <IconButton
          variant="outline"
          onClick={onOpen}
          aria-label="open menu"
          icon={<FiMenu />}
        />
  
        <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold" color={"white"}>
          Documentation
        </Text>
      </Flex>
    )
}