import {
    Header,
    Group,
    Button,
    Box,
  } from '@mantine/core';
import { useSignOut } from 'react-auth-kit';
import { useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
  
  
  
  export function Navtop() {
  

    const qc = useQueryClient();
    const navigate = useNavigate();

    const signOut = useSignOut()

    const logout = () => {
      if(signOut()) {
        qc.clear();
        navigate("/login", {replace: true})
      }
    }


    return (
      <Box>
        <Header height={60} px="md">
          <Group position="right" sx={{ height: '100%' }}>
            {/* logo */}
             <div className="flex items-end justify-end">
                <Button className="bg-yellow-500 hover:bg-yellow-700" onClick={logout}>Se Déconnecter</Button>
             </div>
          </Group>
        </Header>
      </Box>
    );
  }