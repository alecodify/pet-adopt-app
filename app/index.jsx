import { useUser } from '@clerk/clerk-expo';
import { Redirect } from "expo-router";
import { View } from "react-native";
import { useEffect, useState } from 'react';

export default function Index() {
  const { user } = useUser();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (user !== null) {
      setIsLoggedIn(true);
    }
  }, [user]);

  return (
    <View style={{ flex: 1 }}>
      {isLoggedIn === true ? <Redirect href={'/(tabs)/home'} /> : <Redirect href={'/login'} />}
    </View>
  );
}
