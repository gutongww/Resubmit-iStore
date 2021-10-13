import { useState, useRef, useEffect} from 'react';
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
import { useHistory, useLocation } from "react-router-dom";
import { useMutation,useQuery as usQuery, gql } from "@apollo/client";
import { LOGIN } from "../api/mutations";


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

export interface Login_login_user {
  __typename: "User";
  username: string;
  password: string;
  address: string;
}

const GET_USER = gql`
query{
  users{
      username
      password
  }
}
`;

export interface Login_login {
  __typename: "LoginPayload";
  student: Login_login_user;
  jwt: string;
}

export interface Login {
  login: Login_login;
}

export interface LoginVariables {
  code: string;
}

function useQuery2() {
  return new URLSearchParams(useLocation().search);
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

  const Shopping2 = () => {
    const {loading} = usQuery<Login_login_user>(
      GET_USER,
    );
    const [login] = useMutation<Login>(LOGIN);
    const query = useQuery2();
    const history = useHistory();
  
    useEffect(() => {
      const loginMethod = async () => {
        const code = query.get("code");
        
    
        if (code != null) {
          try {
            const { data } = await login({ variables: { code } });
            if (data != null) {
              localStorage.setItem("token", data.login.jwt)
              console.log(data)
            }
          } catch (e) {
            console.log(e);
          }
          history.push('/');
        }
      };
      loginMethod();
    }, []);

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

        <Button color="inherit" onClick = { () => alert('Success') }>Check out</Button>
        </Drawer>

        
    <StyledButton onClick={() => setCartOpen(true)}>
    <Badge badgeContent={getTotalItems(cartItems)} color='error'>
        <AddShoppingCartIcon />
    </Badge>
    </StyledButton>


    
    <Grid container spacing={5}>
        {data?.map(item => (
          <Grid item key={item.id} xs={10} sm={3}>
            <Item item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>

    </Wrapper>
  );
};

export default Shopping2;