import { IconButton } from '@chakra-ui/button';
import { DeleteIcon } from '@chakra-ui/icons';
import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table';

const CartTable = ({ cart, onDelete }) => (
  <Table>
    <Thead>
      <Th>Sr No</Th>
      <Th>Giftcard</Th>
      <Th>Recipient Email address</Th>
      <Th>Denominations (&#8377;)</Th>
    </Thead>
    <Tbody>
      {cart.map((item, index) => (
        <Tr key={`key-${index}`}>
          <Td>{index + 1}</Td>
          <Td>{item.name}</Td>
          <Td>{item.recipientEmail}</Td>
          <Td>&#8377; {item.denomination}</Td>
          <Td>
            <IconButton
              onClick={() => onDelete(index)}
              size="xs"
              aria-label="delete"
              icon={<DeleteIcon />}
            />
          </Td>
        </Tr>
      ))}
    </Tbody>
  </Table>
);

export default CartTable;
