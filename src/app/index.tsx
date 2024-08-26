import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Text, View, Image, FlatList, Animated, useWindowDimensions} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { products } from "dummy";
import { IProduct } from "types/product";
import { asignProduct } from "utils/lowercaseproduct";

export default function Page() {
  return (
    <View className="flex flex-1">
      <Header />
      <Content />
    </View>
  );
}

function Content() {
  const [data, setData] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const {height, width} = useWindowDimensions()

// const itemSize = height * 0.1
const itemheight = 90 ;

  const scrollY = useRef(new Animated.Value(0)).current

  const fetctData = useCallback(async () => {
    try {


      const transformedProducts = asignProduct(products);
      // const response = await axios.get("https://api.restful-api.dev/objects")

      // if(response.data) {

      //   const transformedProducts = asignProduct(response.data);
   
        setData(transformedProducts);
      // }
    } catch (error) {
      const transformedProducts = asignProduct(products);

      setData(transformedProducts);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetctData();
  }, []);

  if (isLoading) {
    return <Text>loading</Text>;
  }

  return (
    <View className="flex-1">
      <View className="py-5 md:py-24 lg:py-32 xl:py-48">
        <View className="px-4 md:px-6">
          <View>


            <Animated.FlatList
              data={data}
              onScroll={Animated.event([
                {
                  nativeEvent: {
                    contentOffset: {
                      y: scrollY
                    }
                  }
                }
              ], {
                    useNativeDriver: true
                })}
            renderItem={({ item, index }) => {

              const inputRange = [
                -1, 0, itemheight * (index) , itemheight * (index + 0.5)
                // -1, 0, height  * index , height * (index + 0.5)
              ]
              
              const opacityRange = [
                -1, 0, itemheight * (index) , itemheight * (index + 0.5)
                // -1, 0, height * index , height * (index + 0.5)
              ]

const scale  = scrollY.interpolate({
  inputRange,
  outputRange: [1,1,1,0]
})


const opacity  = scrollY.interpolate({
  inputRange: opacityRange,
  outputRange: [1,1,1,0]
})





              return(
                <Animated.View style={{
                  // width: width * 0.9,
                  height: itemheight,
                  transform: [{scale}],
                  opacity
                }}> 

                  <RenderData key={index} {...item} />
                </Animated.View>
            )}}
              contentContainerClassName="gap-4"    
              showsVerticalScrollIndicator={false}
              bounces={false}
              keyExtractor={(key) => key.id.toString()}
            />

          </View>
        </View>
      </View>
    </View>
  );
}

function Header() {
  const { top } = useSafeAreaInsets();
  return (
    <View style={{ paddingTop: top }}>
      <View className=" h-14  flex-row bg-black">
        <Image
          source={{
            uri: "https://www.cashwyre.io/img/logo-new-1.3cc3c4e5.png",
          }}
          className="h-full  w-1/2"
          resizeMode="contain"
        />
      </View>
    </View>
  );
}

// Id, Name, Colour, Capacity, Generation, Screen size
const RenderData = ({ data, name, id }: IProduct) => {
  const screenSize = data?.["screen size"] ?? undefined;

 

  // shadow-slate-400 shadow-md transition-shadow
  return (
    <View className="w-full border p-3 rounded bg-black bg-opacity-80  h-full " 
    style={{
      shadowColor: "#000",
      shadowRadius: 20,
      shadowOpacity: 1,
      shadowOffset: {
        height: 10,
        width: 0
      }
    }}
    >
      {id && (
        <View className="flex-row gap-3">
          <Text className="text-white">ID: </Text>
          <Text className="text-slate-400">{id}</Text>
        </View>
      )}

      {name && (
        <View className="flex-row gap-3">
          <Text className="text-white">Name: </Text>
          <Text className="text-slate-400">{name}</Text>
        </View>
      )}

      {data?.color && (
        <View className="flex-row gap-3">
          <Text className="text-white">Colour: </Text>
          <Text className="text-slate-400">{data?.color}</Text>
        </View>
      )}

      {data?.capacity && (
        <View className="flex-row gap-3">
          <Text className="text-white">Capacity: </Text>
          <Text className="text-slate-400">{data?.capacity}</Text>
        </View>
      )}

      {data?.generation && (
        <View className="flex-row gap-3">
          <Text className="text-white">Generation: </Text>
          <Text className="text-slate-400">{data?.generation}</Text>
        </View>
      )}

      {screenSize && (
        <View className="flex-row gap-3">
          <Text className="text-white">Screen Size: </Text>
          <Text className="text-slate-400">{screenSize}</Text>
        </View>
      )}
    </View>
  );
};


