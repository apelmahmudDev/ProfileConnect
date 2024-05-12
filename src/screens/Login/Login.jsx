import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {Button, Input} from '../../components';
import {useSignInMutation} from '../../store/services/signInApi';
import {useDispatch, useSelector} from 'react-redux';
import {setToken} from '../../store/slices/authSlice';

const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');

  const [signIn, {data, isLoading, isSuccess}] = useSignInMutation();
  const {token} = useSelector(state => state.auth);

  console.log('token is', token);

  const handleLogin = async () => {
    await signIn({email, password});
  };

  // setToken to redux store
  useEffect(() => {
    if (isSuccess) {
      console.log('data is b', data?.response?.records?.token);
      dispatch(setToken(data?.response?.records?.token));
    }
  }, [isSuccess, data?.response?.records?.token, dispatch]);

  return (
    <View>
      <Input
        onChangeText={onChangeEmail}
        placeholder="e.g, johnson@gmail.com"
      />
      <Input onChangeText={onChangePassword} placeholder="**********" />
      <Button
        onPress={handleLogin}
        style={{backgroundColor: 'green', padding: 10}}>
        <Text>Login</Text>
      </Button>

      <Text>Don't have an account? </Text>
      <Button
        onPress={() => navigation.navigate('Register')}
        style={{backgroundColor: 'blue', padding: 10}}>
        <Text>Register</Text>
      </Button>
    </View>
  );
};

export default Login;