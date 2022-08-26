import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Map from '../src/components/Map';
import styles from '../styles/Home.module.css';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Heading,
	HStack,
	IconButton,
	Input,
	InputGroup,
	InputLeftElement,
	Link,
	useBoolean,
	useColorMode,
	useColorModeValue,
	VStack,
} from '@chakra-ui/react';
import { BiSearchAlt, BiKey } from 'react-icons/bi';
import { FaSun, FaMoon, FaGithub } from 'react-icons/fa';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';
import { useState } from 'react';
import { useEffect } from 'react';

const render = (status: Status) => {
	return <h1>{status}</h1>;
};

interface StyleProps {
	featureType: string;
	elementType?: string;
	stylers: [];
}

const Home: NextPage = () => {
	const {  toggleColorMode } = useColorMode();
	const [isOpen, setOpen] = useState(true);

	const toggleDarkModeIcon = useColorModeValue(<FaMoon color='#A0AEC0' />, <FaSun color='#A0AEC0' />);

	const variants = {
		open: { opacity: 1, y: 0 },
		closed: { opacity: 0, y: '100%' },
		animate: {},
	};

	return (
		<Box h='100vh' pos='relative' maxH='100vh' overflow='hidden'>
			<Wrapper apiKey={process.env.MAPS_API_KEY ?? ''} render={render}>
				<Map center={{ lat: 43.653226, lng: -79.3831843 }} zoom={15}  />
				<Box
					as={motion.div}
					layout='position'
					shadow='xl'
					rounded='2xl'
					roundedBottom={{ base: 0, md: '2xl' }}
					my={{ base: 0, md: 10 }}
					mx={{ base: 0, md: 7 }}
					px={{ base: 5, md: 7 }}
					py={5}
					bottom={0}
					left={0}
					pos='absolute'
					h={{ base: '30%', md: 'auto' }}
					w={{ base: 'full', md: '450px' }}
					backdropFilter='auto'
					backdropBlur='32px'
					bg={useColorModeValue('whiteAlpha.800', 'blackAlpha.500')}>
					<HStack spacing={3}>
						<Heading flexGrow={1}>GeoGrid</Heading>
						<Link fontSize='24px'>
							<FaGithub />
						</Link>
						<IconButton
							variant='ghost'
							rounded='full'
							aria-label='colormode'
							fontSize='22px'
							onClick={toggleColorMode}
							icon={toggleDarkModeIcon}
						/>
						<IconButton
							variant='solid'
							rounded='full'
							aria-label='colormode'
							fontSize='22px'
							onClick={() => setOpen(!isOpen)}
							icon={isOpen ? <MdExpandMore /> : <MdExpandLess />}
						/>
					</HStack>
					{isOpen && (
						<motion.div initial={{ visibility: 'hidden' }} animate={{ visibility: 'visible' }}>
							<VStack spacing={5} pt={3} overflow='hidden'>
								<FormControl>
									<FormLabel>Address</FormLabel>
									<InputGroup>
										<InputLeftElement pointerEvents='none'>
											<BiSearchAlt />
										</InputLeftElement>
										<Input autoFocus type='text' variant='filled' placeholder='Enter a location or business' />
									</InputGroup>
								</FormControl>
								<FormControl>
									<FormLabel>Keyword</FormLabel>
									<InputGroup>
										<InputLeftElement pointerEvents='none'>
											<BiKey />
										</InputLeftElement>
										<Input variant='filled' placeholder='Enter a search keyword'></Input>
									</InputGroup>
								</FormControl>
							</VStack>
						</motion.div>
					)}
				</Box>
			</Wrapper>
		</Box>
	);
};

export default Home;
