import { useState } from 'react';
import { createStyles, Navbar } from '@mantine/core';
import { Link, Route, Routes } from 'react-router-dom';
import { Navtop } from '../components/Navtop';
import Tournois from './Tournois';
import Container from 'react-modal-promise';
import TournoisTypes from './TournoisTypes';
import Users from './Users';
import Joueurs from './Joueurs';
import Equipes from './Equipes';
import Matchs from './Matchs';

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: 'flex',
  },

  main: {
    flex: 1,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
  },

  mainLink: {
    width: 44,
    height: 44,
    borderRadius: theme.radius.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
    },
  },

  mainLinkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
    },
  },

  link: {
    boxSizing: 'border-box',
    display: 'block',
    textDecoration: 'none',
    borderTopRightRadius: theme.radius.md,
    borderBottomRightRadius: theme.radius.md,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    padding: `0 ${theme.spacing.md}px`,
    fontSize: theme.fontSizes.sm,
    marginRight: theme.spacing.md,
    fontWeight: 500,
    height: 44,
    lineHeight: '44px',

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
  },

  linkActive: {
    '&, &:hover': {
      borderLeftColor: theme.fn.variant({ variant: 'filled', color: theme.primaryColor })
        .background,
      backgroundColor: theme.fn.variant({ variant: 'filled', color: "yellow" })
        .background,
      color: theme.white,
    },
  },
}));


export function Dashboard() {
  const { classes, cx } = useStyles();
  const [activeLink, setActiveLink] = useState('admins');
  
  return (
    <>
    <Navtop />
    <div className="flex flex-col md:flex-row">
       <Navbar className="w-full md:w-2/12 h-auto md:h-screen">
      <Navbar.Section grow className={classes.wrapper}>
        <div className={classes.main}>
        <Link
      className={cx(classes.link, { [classes.linkActive]: activeLink === 'admins' })}
      to="admins"
      onClick={() => {
        setActiveLink('admins');
      }}
    >
      Liste des Administrateurs
    </Link>
        <Link
      className={cx(classes.link, { [classes.linkActive]: activeLink === 'tournois' })}
      to="tournois"
      onClick={() => {
        setActiveLink('tournois');
      }}
    >
      Liste des Tournois
    </Link>
    <Link
      className={cx(classes.link, { [classes.linkActive]: activeLink === 'joueurs' })}
      to="joueurs"
      onClick={() => {
        setActiveLink('joueurs');
      }}
    >
      Liste des Joueurs
    </Link>
    <Link
      className={cx(classes.link, { [classes.linkActive]: activeLink === 'equipes' })}
      to="equipes"
      onClick={() => {
        setActiveLink('equipes');
      }}
    >
      Liste des Equipes
    </Link>
    <Link
      className={cx(classes.link, { [classes.linkActive]: activeLink === 'matchs' })}
      to="matchs"
      onClick={() => {
        setActiveLink('matchs');
      }}
    >
      Liste des Matchs
    </Link>
        </div>
      </Navbar.Section>
     
    </Navbar>
    <div className="w-full md:w-10/12">
    <Routes>
     <Route path="" element={<Users />} />
     <Route path="/tournois" element={<Tournois />}/>
     {/* <Route path="/tournois-type" element={<TournoisTypes />}/> */}
     <Route path="/admins" element={<Users />}/>
     <Route path="/joueurs" element={<Joueurs />}/>
     <Route path="/equipes" element={<Equipes />}/>
     <Route path="/matchs" element={<Matchs />}/>
     </Routes>
    </div>
    </div>
     <Container />
    </>
  
  );
}