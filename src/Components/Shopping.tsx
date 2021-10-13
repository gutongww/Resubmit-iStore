import { useState, useRef } from 'react';
import { useQuery } from 'react-query';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
// Components
import Item from './Item';
import Cart from './Cart';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Badge from '@material-ui/core/Badge';
import { AppBar, IconButton, Toolbar, Drawer, Button} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import {Sidebar} from '../Components/Sidebar';
import TextField from './TextField';
// Styles
import { Wrapper, StyledButton } from './App.styles';
import CheckoutWrapper from '../CheckoutWrapper';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { useQuery as usQuery, gql } from '@apollo/client';

const httpLink = createHttpLink({
  uri: 'https://istore-msa-2021.azurewebsites.net/graphql/',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

const GET_USER = gql`
query{
  users{
      username
      password
  }
}
`;

// Types
export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

export type Login_login_user = {
  username: string;
  password: string;
  address: string;
}


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(20),
    },
    title: {
      flexGrow: 1,
    },
  })
);

const getProducts = async (): Promise<CartItemType[]> =>
  await (await fetch('https://fakestoreapi.com/products')).json();

  const getUsers = async (): Promise<Login_login_user[]> =>
  await (await fetch('http://istore-msa-2021.azurewebsites.net/graphql/')).json();

  const Shopping = () => {
    const { loading} = usQuery<Login_login_user>(
      GET_USER,
    );
    const [sideBar, setSideBar] = useState(false);
    const classes = useStyles();
  
    const toggleSideBar = () => {
        setSideBar(!sideBar);
    };
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    'products',
    getProducts
  );


  const [val, setVal] = useState("");
  const inputRef = useRef(null);

  console.log(data);

  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount, 0);

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems(prev => {
      // 1. Is the item already added in the cart?
      const isItemInCart = prev.find(item => item.id === clickedItem.id);

      if (isItemInCart) {
        return prev.map(item =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }
      // First time the item is added
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems(prev =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as CartItemType[])
    );
  };

  if (isLoading) return <LinearProgress />;
  if (error) return <div>Something went wrong ...</div>;

  return (
    
    <Wrapper>
        <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
            <Cart
            cartItems={cartItems}
            addToCart={handleAddToCart}
            removeFromCart={handleRemoveFromCart}
            />


            
<p>User Name: </p>
            <TextField
        placeholder="First Name:"
        value={val}
        onChange={setVal}
        ref={inputRef}
      />
        <p>Password: </p>
        <TextField
        placeholder="Last Name:"
        value={val}
        onChange={setVal}
        ref={inputRef}
      />
        <p>Ship Address: </p>
        <TextField
        placeholder="Ship Address:"
        value={val}
        onChange={setVal}
        ref={inputRef}
      />
        <Button color="inherit">Register</Button>
        <Button color="inherit" onClick = { () => alert('Please log in first') }>Check out</Button>
        </Drawer>

        
    <StyledButton onClick={() => setCartOpen(true)}>
    <Badge badgeContent={getTotalItems(cartItems)} color='error'>
        <AddShoppingCartIcon />
    </Badge>
    </StyledButton>

    <div className={classes.root}>
        <p>  </p>
      </div>
    
    <Grid container spacing={5}>
        {data?.map(item => (
          <Grid item key={item.id} xs={10} sm={3}>
            <Item item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>

      <div className={classes.root}>
        <p>   ♥ </p>
      </div>
      <div className={classes.root}>
        <p>   haha  </p>
      </div>
    </Wrapper>
  );
};

export default Shopping;