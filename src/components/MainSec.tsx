import { Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';

interface DataItem {
  id: number;
  distanceCm: number;
  distanceInch: number;
}

function MainSec() {
  const [data, setData] = useState<DataItem[]>([]);

useEffect(() => {
    // Fetch data from Node.js server
    fetch('http://localhost:3000/datadisplay')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Received data:', data); // Log the received data
        setData(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h1>Data from Database</h1>
      <TableContainer>
        <Table variant='striped' colorScheme='teal' size='md'>
          <TableCaption>Arduino Data</TableCaption>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Distance in CM</Th> 
              <Th>DIstance in Inch</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((item) => (
              <Tr key={item.id}>
                  <Td>{item.id}</Td>
                  <Td>{item.distanceCm}</Td> 
                  <Td>{item.distanceInch}</Td>
              </Tr>
             ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>ID</Th>
              <Th>Distance in CM</Th>
              <Th>DIstance in Inch</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </div>
  );
}

export default MainSec;