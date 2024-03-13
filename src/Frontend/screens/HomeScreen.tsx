import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { Text, View, StyleSheet, ScrollView, StatusBar, TouchableOpacity, TextInput, Pressable, Image } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import { SliderBox } from 'react-native-image-slider-box'
import DropDownPicker from 'react-native-dropdown-picker'
import ProductItem from '../component/ProductItem';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

interface HomeScreenProps { }

const HomeScreen = (props: HomeScreenProps) => {

    const [products, setProducts] = useState([]);
    const [open, setOpen] = useState(false);
    const [catagory, setCatagory] = useState('jewelery');
    const [items, setItems] = useState([
        { id: 0, label: "men's clothing", value: "men's clothing" },
        { id: 1, label: "jewelery", value: "jewelery" },
        { id: 2, label: "electronics", value: "electronics" },
        { id: 3, label: "women's clothing", value: "women's clothing" },

    ])
    const [modalVisible, setModalVisible] = useState(false)
    const [adresses, setAdresses] = useState("")
    const [selectedItem, setSelectedItem] = useState("")
    console.log(selectedItem)
    const navigation = useNavigation()

    //  fetching data for offers
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('https://fakestoreapi.com/products');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []);


    // fetching the adresses from get request
    const handleFetchingAdresses = async () => {
        // getting stored userId which is stored in the async storage
        const userId = await AsyncStorage.getItem('userId')

        // Getting all the data form get request
        axios.get(`https://3301-39-53-21-161.ngrok-free.app/adresses/${userId}`).then((response) => {
            console.log(response)
            // set al the data in to a state
            setAdresses(response.data)
        }).catch((error) => {
            console.log(error)
        })     
    }
    
    useEffect(() => {
        handleFetchingAdresses()
    }, [])


    // set the state if the modal will be open
    const onGenderOpen = useCallback(() => {
        setOpen(true)
    }, [])

    const handlePress = (item: any) => {
        console.log(item)
    }

    const images = [
        "https://www.91-cdn.com/hub/wp-content/uploads/2023/07/amazon-prime-day-sale-best-deals-featured-1.png",
        "https://img.etimg.com/thumb/width-640,height-480,imgsize-27660,resizemode-75,msid-101794370/top-trending-products/news/amazon-prime-day-sale-2023-tv-deals-on-brands-like-tcl-sony-lg-and-more/amazon-prime-day-sale-2023.jpg",
        "https://www.91-cdn.com/hub/wp-content/uploads/2022/07/amazon_prime_day_sale_end_deals_270.png"
    ]
    const deals = [
        {
            id: 1,
            title: "iPhone 13 Pro",
            newPrice: 1099,
            oldPrice: 1199,
            color: "Graphite",
            size: "128GB",
            image: 'https://static.skyassets.com/contentstack/assets/blt292fe19f56d1a1a8/blt2a3d21d500dd4771/65ba179bd2067bb63f8c65bc/Sky_deals_dealcard_E3.png?imageManager=true&impolicy=resize&width=416',
            carosoulImages: [
                "https://static.skyassets.com/contentstack/assets/blt292fe19f56d1a1a8/blt2a3d21d500dd4771/65ba179bd2067bb63f8c65bc/Sky_deals_dealcard_E3.png?imageManager=true&impolicy=resize&width=416",
                "https://cdn.dummyjson.com/product-images/4/1.jpg",
                "https://cdn.dummyjson.com/product-images/4/2.jpg",
                "https://cdn.dummyjson.com/product-images/4/3.jpg",
                "https://cdn.dummyjson.com/product-images/4/4.jpg",
                "https://cdn.dummyjson.com/product-images/4/thumbnail.jpg"
            ]
        },
        {
            id: 2,
            title: "Samsung Galaxy S21 Ultra",
            newPrice: 999,
            oldPrice: 1299,
            color: "Phantom Black",
            size: "256GB",
            carosoulImages: [
                "https://canary.contestimg.wish.com/api/webimage/64f4e02d2c83f29f1db2e58a-large.jpg?cache_buster=6e68cc08e1e5f5831e5fca5e802083c5",
                "https://cdn.dummyjson.com/product-images/5/1.jpg",
                "https://cdn.dummyjson.com/product-images/5/2.jpg",
                "https://cdn.dummyjson.com/product-images/5/3.jpg"
            ],
            image: 'https://canary.contestimg.wish.com/api/webimage/64f4e02d2c83f29f1db2e58a-large.jpg?cache_buster=6e68cc08e1e5f5831e5fca5e802083c5'
        },
        {
            id: 3,
            title: "Google Pixel 6 Pro",
            newPrice: 899,
            oldPrice: 999,
            color: "Stormy Black",
            size: "128GB",
            carosoulImages: [
                'https://sc04.alicdn.com/kf/H051f9b0f8531416396871909dffec11dU.jpg',
                "https://cdn.dummyjson.com/product-images/6/1.png",
                "https://cdn.dummyjson.com/product-images/6/2.jpg",
                "https://cdn.dummyjson.com/product-images/6/3.png",
                "https://cdn.dummyjson.com/product-images/6/4.jpg"
            ],
            image: 'https://sc04.alicdn.com/kf/H051f9b0f8531416396871909dffec11dU.jpg'
        },
        {
            id: 4,
            title: "OnePlus 9 Pro",
            newPrice: 899,
            oldPrice: 999,
            color: "Morning Mist",
            size: "256GB",
            carosoulImages: [
                "https://ae01.alicdn.com/kf/S4dd7d23c6b6e4ced96311a39cef2d81dt.jpg_640x640Q90.jpg_.webp",
                "https://cdn.dummyjson.com/product-images/7/1.jpg",
                "https://cdn.dummyjson.com/product-images/7/2.jpg",
                "https://cdn.dummyjson.com/product-images/7/3.jpg",
                "https://cdn.dummyjson.com/product-images/7/thumbnail.jpg"
            ],
            image: 'https://ae01.alicdn.com/kf/S4dd7d23c6b6e4ced96311a39cef2d81dt.jpg_640x640Q90.jpg_.webp'
        }
    ]
    const offers = [
        {
            id: 1,
            title: "Product A - Red Normal",
            offer: "20% off",
            oldPrice: 100,
            newPrice: 80,
            color: "Red",
            size: "Normal",
            carosoulImages: [
                'https://estreet.pk/media/catalog/product/cache/12d96b7cdffbe2e82811f5f2c39a586d/i/m/images_29__1.jpeg',
                'https://3ba1f5b2.rocketcdn.me/wp-content/uploads/2019/11/Difference-Between-EarPods-and-AirPods--1024x693.jpg',
                'https://m.media-amazon.com/images/I/71wTOuHOGiL._AC_UF894,1000_QL80_.jpg',
                'https://i.insider.com/5ad617db146e7127008b4bef?width=1136&format=jpeg'
            ],
            image: 'https://estreet.pk/media/catalog/product/cache/12d96b7cdffbe2e82811f5f2c39a586d/i/m/images_29__1.jpeg'
        },
        {
            id: 2,
            title: "Product B - Blue Big",
            offer: "15% off",
            oldPrice: 200,
            newPrice: 170,
            color: "Blue",
            size: "Big",
            carosoulImages: [
                'https://www.cnet.com/a/img/resize/770007077c38361ca13ef0b0aa4c208f88fa2053/hub/2023/09/20/9e9b8e2b-04ee-4087-b819-c99ec8bbc980/apple-watch-ultra-2-7.jpg?auto=webp&fit=crop&height=1200&width=1200',
                'https://saamaan.pk/cdn/shop/products/Comet-Infinity-Smartwatch.jpg?v=1671009969',
                'https://m.media-amazon.com/images/I/6152wS4BKxL._AC_UF1000,1000_QL80_.jpg',
                'https://img.fruugo.com/product/9/31/945096319_max.jpg',
                'https://rukminim1.flixcart.com/image/750/900/kpinwy80/smartwatch/6/w/p/33-d116-android-ios-atlanta-original-imag3qdr4wmnrewu.jpeg?q=70'
            ],
            image: 'https://www.cnet.com/a/img/resize/770007077c38361ca13ef0b0aa4c208f88fa2053/hub/2023/09/20/9e9b8e2b-04ee-4087-b819-c99ec8bbc980/apple-watch-ultra-2-7.jpg?auto=webp&fit=crop&height=1200&width=1200'
        },
        {
            id: 3,
            title: "Product C - Green Small",
            offer: "30% off",
            oldPrice: 150,
            newPrice: 105,
            color: "Green",
            size: "Small",
            carosoulImages: [
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqDhKw_LcReOTutMDN2iMfF8He3WrqXOdWueAU9YcM4A&s',
                'https://img.freepik.com/free-photo/shiny-black-headphones-reflect-golden-nightclub-lights-generated-by-ai_188544-10148.jpg',
                'https://t3.ftcdn.net/jpg/05/95/78/78/360_F_595787852_efGpIfJmAJxcof7PBsQsDmirsZ3R8o50.jpg',
                'https://www.digitaltrends.com/wp-content/uploads/2023/07/beats-studio-pro-vs-apple-airpods-max.jpeg?fit=720%2C480&p=1',
                'https://www.masterdynamic.com/cdn/shop/files/MD_Bugatti_Homepage_Mobile-V1.jpg?v=1691412592&width=790'
            ],
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqDhKw_LcReOTutMDN2iMfF8He3WrqXOdWueAU9YcM4A&s'
        },
        {
            id: 4,
            title: "Product D - Yellow Big",
            offer: "25% off",
            oldPrice: 120,
            newPrice: 90,
            color: "Yellow",
            size: "Big",
            carosoulImages: [
                'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
                'https://shopgroove.pk/cdn/shop/products/S3de10d87d99b4ef787a75caaa6dba0dak_jpg_640x640Q90_jpg.jpg?v=1664899581&width=360',
                'https://ae01.alicdn.com/kf/S808445642da0450bb4df8812c1adf7cdj/New-Mens-Summer-T-Shirt-Striped-3D-Print-Men-T-Shirt-Casual-Slim-Fit-Short.jpg_640x640.jpg',
                'https://i.ebayimg.com/images/g/FTAAAOSwZgJgzeJc/s-l1200.jpg',
                'https://5.imimg.com/data5/SELLER/Default/2023/2/BE/MP/CC/181362804/whatsapp-image-2023-02-02-at-1-45-45-pm-1--250x250.jpeg'
            ],
            image: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg'
        }
    ]
    const cameras = [
        {
            id: 1,
            title: 'Camera-1',
            oldPrice: 12000,
            image: 'https://thumbs.dreamstime.com/b/dslr-camera-isolated-white-16044212.jpg',

        },
        {
            id: 2,
            title: 'Camera-2',
            oldPrice: 13450,
            image: 'https://img.freepik.com/premium-photo/professional-camera-white-background_488220-1465.jpg',
        },
        {
            id: 3,
            title: 'Camera-3',
            oldPrice: 13000,
            image: 'https://media.gettyimages.com/id/155908040/photo/dslr-camera-with-lens-isolated-on-white-clipping-path.jpg?s=612x612&w=gi&k=20&c=fXg_GHyTPpg5YCt6N_NbFO_I4RlToPon3W7p3fpbBLI=',
        },
        {
            id: 4,
            title: 'Camera-4',
            oldPrice: 12000,

            image: 'https://img.freepik.com/premium-photo/dslr-camera-white_144962-4376.jpg?w=360',
        },
        {
            id: 5,
            title: 'Camera-5',
            oldPrice: 140000,
            image: 'https://png.pngtree.com/background/20230613/original/pngtree-black-and-white-photo-of-a-camera-picture-image_3404636.jpg',
        },
        {
            id: 6,
            title: 'Camera-6',
            oldPrice: 20000,
            image: 'https://png.pngtree.com/background/20230613/original/pngtree-black-and-white-photo-of-a-camera-picture-image_3404636.jpg',
        },
        {
            id: 7,
            title: 'Camera-7',
            oldPrice: 30000,
            image: 'https://atlas-content-cdn.pixelsquid.com/assets_v2/163/1637794803473191953/jpeg-600/G11.jpg?modifiedAt=1'
        },
        {
            id: 8,
            title: 'Camera-8',
            oldPrice: 120000,
            image: 'https://5.imimg.com/data5/WQ/AV/MY-45422467/cctv-dome-cameras-500x500.png',
        }
    ]
    const clothings = [
        {
            id: 1,
            title: 'Shirt-1',
            oldPrice: 12000,
            image: 'https://www.gapcanada.ca/webcontent/0028/307/410/cn28307410.jpg',

        },
        {
            id: 2,
            title: 'Shirt-2',
            oldPrice: 13450,
            image: 'https://www.jcrew.com/s7-img-facade/BS065_KF6713',
        },
        {
            id: 3,
            title: 'Shirt-3',
            oldPrice: 13000,
            image: 'https://www.mensjournal.com/.image/t_share/MTk3MjA1Mjg5MDIyMjY4NzM1/toddsnydershirt1.jpg',
        },
        {
            id: 4,
            title: 'Shirt-4',
            oldPrice: 12000,
            image: 'https://i.ebayimg.com/images/g/dU8AAOSwtOZkEGyx/s-l1200.webp',
        },
        {
            id: 5,
            title: 'Trowser-5',
            oldPrice: 14000,
            image: 'https://faithfullthebrand.com/cdn/shop/products/S244-22617-FaithfullTheBrand-B-0370_1024x1024.jpg?v=1682304865',
        },
        {
            id: 6,
            title: 'Pent-6',
            oldPrice: 2000,
            image: 'https://st.depositphotos.com/1000938/61220/i/450/depositphotos_612208644-stock-photo-men-jeans-isolated-white-background.jpg',
        }
    ]
    const shoes = [
        {
            id: 1,
            title: 'Shoes-1',
            oldPrice: 12000,
            image: 'https://img.freepik.com/premium-photo/casual-shoes-sneakers_104337-9701.jpg',

        },
        {
            id: 2,
            title: 'Shoes-2',
            oldPrice: 13450,
            image: 'https://myshoes.vn/image/cache/data/product6/17.6.16/Giay-Nike-Air-Zoom-Pegasus-33-nu-831356_100-05-800x800.jpg',
        },
        {
            id: 3,
            title: 'Shoes-3',
            oldPrice: 13000,
            image: 'https://ph-test-11.slatic.net/p/ddc066e2817f909f43d783211af4ef00.jpg',
        },
        {
            id: 4,
            title: 'Shoes-4',
            oldPrice: 12000,
            image: 'https://cdnimg.brunomarcshoes.com/brunomarcshoes/product/product/2023-06-15/2096/08:49--DP03%20(3).jpg',
        },
        {
            id: 5,
            title: 'Shoes-5',
            oldPrice: 140000,
            image: 'https://st3.depositphotos.com/16122460/19162/i/450/depositphotos_191626148-stock-photo-pair-of-casual-shoes-on.jpg',
        },
        {
            id: 6,
            title: 'Shoes-6',
            oldPrice: 20000,
            image: 'https://brand.assets.adidas.com/image/upload/ss24_bad_bunny_response_cl_white_tease_confirmed_pdp_adults_story_tab_d_c7c1838a93.jpg',
        },
        {
            id: 7,
            title: 'Shoes-7',
            oldPrice: 30000,
            image: 'https://contents.mediadecathlon.com/p2153179/e958b22d2eccd9c7db0fea1da358fd8f/p2153179.jpg?format=auto&quality=70&f=650x0',
        },
        {
            id: 8,
            title: 'Shoes-8',
            oldPrice: 120000,
            image: 'https://i5.walmartimages.com/asr/fc64e5ea-a799-4f93-906d-4d4a39b53bcf.a5caf8a729ffe12c4d3878546f20826b.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF',
        }
    ]
    const headphones = [
        {
            id: 1,
            title: 'Headphone-1',
            oldPrice: 12000,
            image: 'https://pakistanstore.pk/wp-content/uploads/2022/09/NIA-WH700-Bluetooth-headphones.webp',

        },
        {
            id: 2,
            title: 'Headphone-2',
            oldPrice: 13450,
            image: 'https://i5.walmartimages.com/asr/5bc2ac63-ed1c-461c-8497-5c39213e4fec.f877fc3cc0ad79803810258422d9e55d.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF',
        },
        {
            id: 3,
            title: 'Headphone-3',
            oldPrice: 13000,
            image: 'https://www.wordans.ie/files/models/2022/10/26/520931/520931_big.jpg?1666785115',
        },
        {
            id: 4,
            title: 'Headphone-4',
            oldPrice: 12000,
            image: 'https://img.freepik.com/premium-photo/white-headphones-white-background-front-view-3d-rendering_187882-2883.jpg',
        },
        {
            id: 5,
            title: 'Headphone-5',
            oldPrice: 140000,
            image: 'https://s2.tekshop247.com/126735-large_default/philips-tauh202wt00-headphonesheadset.jpg',
        },
        {
            id: 6,
            title: 'Headphone-6',
            oldPrice: 20000,
            image: 'https://media.istockphoto.com/id/1198424468/photo/red-headphone-on-white-background-headphones-isolated-on-a-white-background-product.jpg?s=612x612&w=0&k=20&c=UmN1--HmmpqeakurRkVcVZSOx30hringgZ50muBLX-U=',
        },
        {
            id: 7,
            title: 'Headphone-7',
            oldPrice: 30000,
            image: 'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_79777175?x=480&y=334&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=480&ey=334&align=center&resizesource&unsharp=1.5x1+0.7+0.02&cox=0&coy=0&cdx=480&cdy=334',
        },
        {
            id: 8,
            title: 'Headphone-8',
            oldPrice: 120000,
            image: 'https://live.staticflickr.com/65535/51008379475_5fe4bc4e65_b.jpg',
        }
    ]
    const mangas = [
        {
            id: 1,
            title: 'Manga-1',
            oldPrice: 12000,
            image: 'https://rarebookcellar.cdn.bibliopolis.com/pictures/98666.jpg?width=768&height=1000&fit=bounds&auto=webp&v=1565189294',

        },
        {
            id: 2,
            title: 'Manga-2',
            oldPrice: 13450,
            image: 'https://rarebookcellar.cdn.bibliopolis.com/pictures/98810.jpg?auto=webp&v=1565189175',
        },
        {
            id: 3,
            title: 'Manga-3',
            oldPrice: 13000,
            image: 'https://i.ebayimg.com/images/g/YS0AAOSwN89kSQ4F/s-l400.jpg',
        },
        {
            id: 4,
            title: 'Manga-4',
            oldPrice: 12000,
            image: 'https://rarebookcellar.cdn.bibliopolis.com/pictures/98711.jpg?auto=webp&v=1565189212',
        },
        {
            id: 5,
            title: 'Manga-5',
            oldPrice: 140000,
            image: 'https://d3525k1ryd2155.cloudfront.net/h/927/325/942325927.0.x.jpg',
        },
        {
            id: 6,
            title: 'Manga-6',
            oldPrice: 20000,
            image: 'https://www.junku.fr/16079-large_default/saint-seiya-next-dimension-14.jpg',
        },
        {
            id: 7,
            title: 'Manga-7',
            oldPrice: 30000,
            image: 'https://www.animeclick.it/prove/upload/img/News13448.jpg',
        }
    ]
    const jewelry = [
        {
            id: 1,
            title: 'Jewelry-1',
            oldPrice: 12000,
            image: 'https://c8.alamy.com/comp/PYYBWP/gold-chain-on-white-background-PYYBWP.jpg',

        },
        {
            id: 2,
            title: 'Jewelry-2',
            oldPrice: 13450,
            image: 'https://www.elitephotographygroup.com/wp-content/uploads/2020/04/ElitePhotographyGroup-Commercial-Photography-Product-Jewelry-Diamond-Ring-Top-View-12-034-0299.jpg',
        },
        {
            id: 3,
            title: 'Jewelry-3',
            oldPrice: 13000,
            image: 'https://cms.dresma.com/uploads/Image_2_18dd01e601.jpg',
        },
        {
            id: 4,
            title: 'Jewelry-4',
            oldPrice: 12000,
            image: 'https://i.pinimg.com/originals/d7/30/28/d73028606251dcd6d3314ceee1bdf1ee.jpg',
        },
        {
            id: 5,
            title: 'Jewelry-5',
            oldPrice: 14000,
            image: 'https://i.pinimg.com/550x/02/e6/4c/02e64c60b010b72b971c647fcd18a1fa.jpg',
        },
        {
            id: 6,
            title: 'Jewelry-6',
            oldPrice: 2000,
            image: 'https://i.stack.imgur.com/pi0oH.png',
        }
    ]
    const mobiles = [
        {
            id: 1,
            title: 'Mobile-1',
            oldPrice: 12000,
            image: 'data:image/jpeg;base64,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',

        },
        {
            id: 2,
            title: 'Mobile-2',
            oldPrice: 13450,
            image: 'https://img.etimg.com/photo/msid-99080556,imgsize-32858/VivoY56BlackEngine.jpg',
        },
        {
            id: 3,
            title: 'Mobile-3',
            oldPrice: 13000,
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShjqf0DE5tMaVDiBge2iKtYGV4djFYLu_lEXuOPFahXs6N47DAaitGbZkjdWi_v0xNuxU&usqp=CAU',
        },
        {
            id: 4,
            title: 'Mobile-4',
            oldPrice: 12000,
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOgEphsxt8i5u6g-vA5wZLaNtmzXOlNMcl1sb44hsplahQbNjsD82wy473v4F6DrOPHeI&usqp=CAU',
        },
        {
            id: 5,
            title: 'Mobile-5',
            oldPrice: 140000,
            image: 'https://motorolaus.vtexassets.com/arquivos/ids/163356/razr-40-ultra-ecom-render-6-saltwater-slide-.png?v=638254717428130000',
        },
        {
            id: 6,
            title: 'Mobile-6',
            oldPrice: 20000,
            image: 'https://i.ebayimg.com/images/g/bx0AAOSwuM5ko-Ba/s-l1600.jpg',
        },
        {
            id: 7,
            title: 'Mobile-7',
            oldPrice: 30000,
            image: 'https://cdn.tmobile.com/content/dam/t-mobile/en-p/cell-phones/apple/Apple-iPhone-15-Pro-Max/Blue-Titanium/Apple-iPhone-15-Pro-Max-Blue-Titanium-thumbnail.png',
        }
    ]

    return (
        <>
            <ScrollView className="flex flex-1 bg-white" >
                <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
                <ScrollView>
                    {/* View for search bar */}
                    <View className="bg-[#1aada8] flex-row items-center p-3">
                        <View className="bg-white flex-row items-center flex-1 pl-2 rounded-sm">
                            <TouchableOpacity>
                                <AntDesign name="search1" size={20} color="black" />
                            </TouchableOpacity>
                            <TextInput className="pl-2 text-base" placeholder='Search Amazon.in...' />
                        </View>
                        <TouchableOpacity className="pl-2">
                            <SimpleLineIcons name="microphone" size={25} color="black" />
                        </TouchableOpacity>
                    </View>

                    {/* View for showing the location */}
                    <View className="flex flex-row items-center bg-[#8febd4] px-1 py-2">
                        <EvilIcons name="location" color="black" size={30} />
                        <Pressable onPress={() => setModalVisible(!modalVisible)}>
                            {
                                selectedItem ? (
                                    <Text className="font-bold text-black ">
                                        Deliver to {selectedItem?.name} - {selectedItem?.country}, {selectedItem?.city}
                                    </Text>
                                ) : (

                                    <Text className="font-bold text-black ">Add your location </Text>
                                )
                            }
                        </Pressable>
                        <MaterialIcons name="keyboard-arrow-down" size={20} color="black" />
                    </View>

                    {/* Showing the list of catagory */}
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}>
                        {/* Cameras */}
                        <Pressable
                            onPress={() => navigation.navigate('UpperCatagory', { catagory: cameras })}
                            className="p-3 flex justify-center items-center">
                            <Image
                                source={{ uri: 'https://thumbs.dreamstime.com/b/dslr-camera-isolated-white-16044212.jpg' }}
                                className="h-14 w-14 rounded-full object-contain "
                                style={{ resizeMode: 'contain' }}
                            />
                            <Text className="text-black pt-1 items-center justify-center mt-1"> Cameras</Text>
                        </Pressable>
                        {/* Clothings */}
                        <Pressable
                            onPress={() => navigation.navigate('UpperCatagory', { catagory: clothings })}
                            className="p-3 flex justify-center items-center">
                            <Image
                                source={{ uri: 'https://assets.ajio.com/medias/sys_master/root/ajio/catalog/5ef4c463f997dd433b445673/-473Wx593H-410245241-009-MODEL2.jpg' }}
                                className="h-14 w-14 rounded-full"
                                style={{ resizeMode: 'contain' }}
                            />
                            <Text className="text-black pt-1 items-center justify-center mt-1"> Clothings</Text>
                        </Pressable>
                        {/* Shoes */}
                        <Pressable
                            onPress={() => navigation.navigate('UpperCatagory', { catagory: shoes })}
                            className="p-3 flex justify-center items-center">
                            <Image
                                source={{ uri: 'https://c4.wallpaperflare.com/wallpaper/286/94/407/adidas-images-for-desktop-background-wallpaper-preview.jpg' }}
                                className="h-14 w-14 rounded-full"
                                style={{ resizeMode: 'contain' }}
                            />
                            <Text className="text-black pt-1 items-center justify-center mt-1"> Shoes</Text>
                        </Pressable>
                        {/* headphones */}
                        <Pressable
                            onPress={() => navigation.navigate('UpperCatagory', { catagory: headphones })}
                            className="p-3 flex justify-center items-center">
                            <Image
                                source={{ uri: 'https://static.helixbeta.com/prod/710/8752/710_482068752.jpg?imwidth=5000' }}
                                className="h-14 w-14 rounded-full"
                                style={{ resizeMode: 'contain' }}
                            />
                            <Text className="text-black pt-1 items-center justify-center mt-1"> Headphones</Text>
                        </Pressable>
                        {/* Mangas */}
                        <Pressable
                            onPress={() => navigation.navigate('UpperCatagory', { catagory: mangas })}
                            className="p-3 flex justify-center items-center">
                            <Image
                                source={{ uri: 'https://img.freepik.com/premium-photo/portret-sad-anime-girl-icon-portrait-black-white-lines-isolated-white-background-ai-generation_235573-2975.jpg' }}
                                className="h-14 w-14 rounded-full"
                                style={{ resizeMode: 'contain' }}
                            />
                            <Text className="text-black pt-1 items-center justify-center mt-1"> Mangas</Text>
                        </Pressable>
                        {/* Jewelry */}
                        <Pressable
                            onPress={() => navigation.navigate('UpperCatagory', { catagory: jewelry })}
                            className="p-3 flex justify-center items-center">
                            <Image
                                source={{ uri: 'https://asset.swarovski.com/images/$size_1000/t_swa103/b_rgb:ffffff,c_scale,dpr_auto,f_auto,w_auto/5692689_png/galaxy-necklace--laboratory-grown-diamonds-156.5-ct-tw--18k-white-gold-swarovski-5692689.png' }}
                                className="h-14 w-14 rounded-full"
                                style={{ resizeMode: 'contain' }}
                            />
                            <Text className="text-black pt-1 items-center justify-center mt-1"> Jewelry</Text>
                        </Pressable>
                        {/* Mobiles */}
                        <Pressable
                            onPress={() => navigation.navigate('UpperCatagory', { catagory: mobiles })}
                            className="p-3 flex justify-center items-center">
                            <Image
                                source={{ uri: 'https://www.mega.pk/items_images/ts_24670.webp' }}
                                className="h-14 w-14 rounded-full"
                                style={{ resizeMode: 'contain' }}
                            />
                            <Text className="text-black pt-1 items-center justify-center mt-1"> Mobiles</Text>
                        </Pressable>
                    </ScrollView>

                    {/* Slider box for showing deals */}
                    <View>
                        <SliderBox
                            images={images}
                            autoPlay
                            circleLoop
                            dotColor={"black"}
                            inactiveDotColor={'gray'}
                            imageComponentstyle={{ width: '100%'}}
                            resizeMode = 'contain'
                        />
                    </View>

                    {/* View for handling trending deals of the week */}
                    <Text className="font-bold text-xl text-black p-3">Trending Deals of the week</Text>
                    <View className="flex flex-row flex-wrap mx-3">
                        {
                            deals && deals.map((item, index) => (
                                <Pressable
                                    onPress={() => navigation.navigate('Info', {
                                        id: item?.id,
                                        title: item?.title,
                                        price: item?.newPrice,
                                        oldPrice: item?.oldPrice,
                                        color: item?.color,
                                        carosoulImages: item?.carosoulImages,
                                        item: item,
                                        size: item?.size
                                    })}
                                    key={index} className="m-3">
                                    <Image source={{ uri: item.image }} className="h-36 w-36 rounded-sm" />
                                </Pressable>
                            ))
                        }
                    </View>

                    <Text className="h-[2px] bg-slate-400 my-2" />

                    {/* View for handling todays deals */}
                    <Text className="font-bold text-xl text-black p-3">Today's Deals</Text>

                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}>
                        {
                            offers.map((item, index) => (
                                <Pressable
                                    onPress={() => navigation.navigate('Info', {
                                        id: item?.id,
                                        title: item?.title,
                                        price: item?.newPrice,
                                        oldPrice: item?.oldPrice,
                                        color: item?.color,
                                        carosoulImages: item?.carosoulImages,
                                        item: item,
                                        size: item?.size,
                                        offer: item?.offer
                                    })}
                                    key={index} className="mx-4 my-2">
                                    <Image source={{ uri: item.image }} style={{ resizeMode: 'contain' }} className="h-40 w-40 rounded-sm" />
                                    <View className="bg-red-600 mt-5 p-1 rounded-md flex items-center">
                                        <Text className="text-white text-base">Upto {item.offer}</Text>
                                    </View>
                                </Pressable>
                            ))
                        }
                    </ScrollView>

                    <Text className="h-[2px] bg-slate-400 my-2" style={{ marginBottom: open ? 50 : 15 }} />

                    {/* View which handle the drop down for catagories selection */}
                    <View className="mx-2 mt-3" style={{ marginBottom: open ? 50 : 15, width: '45%' }}>
                        <DropDownPicker
                            style={{
                                borderColor: 'black',
                                height: 30,
                                marginBottom: open ? 120 : 15
                            }}
                            open={open}
                            value={catagory}
                            items={items}
                            setOpen={setOpen}
                            setValue={setCatagory}
                            setItems={setItems}
                            placeholder="Choose Catagory"
                            onOpen={onGenderOpen}
                            zIndex={3000}
                            zIndexInverse={1000}
                        />
                    </View>

                    {/* View for handling the Product item */}

                    <View className="flex flex-row flex-wrap justify-center items-center">
                        {products.filter((item) => item.category === catagory).map((item, index) => (
                            <ProductItem item={item} key={index} />
                        ))}

                    </View>
                </ScrollView>
            </ScrollView >

            {/* Modal for selecting the location  */}
            < Modal
                isVisible={modalVisible}
                onBackdropPress={() => setModalVisible(false)}
                swipeDirection={['up', 'down']}
                swipeThreshold={200}
                style={{ justifyContent: 'flex-end', margin: 0 }}
            >
                <View style={{ height: 400, backgroundColor: 'white', borderTopRightRadius: 55, borderTopLeftRadius: 55, padding: 30}}>
                    <Text className="text-black text-xl font-bold">Choose your location</Text>
                    <Text className="text-base mt-2">Select a delivery option to acess the product avaliablity</Text>
                    {/* Add adresses */}
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}>

                        {
                            Array.isArray(adresses) ? (

                                adresses?.map((item, index) => (
                                    <Pressable
                                        onPress={() => setSelectedItem(item)}>
                                        <View
                                            key={index}
                                            className="border-gray-300 border-[1px] mx-2 py-[15px] px-2"
                                            style={{
                                                backgroundColor: item === selectedItem ? '#edaf8c' : 'white',
                                                borderColor: '#ccc',
                                                borderWidth: 1,
                                                margin: 2,
                                                padding: 15,
                                                marginTop: 4,
                                            }}>
                                            <View className="flex flex-row items-center">
                                                <Text className="font-bold, text-black text-xl">{item?.name}</Text>
                                                <Entypo name="location-pin" size={20} color="red" />
                                            </View>
                                            <View className="flex flex-row items-center">
                                                <Text className="text-black text-base">{item?.country}, </Text>
                                                <Text className="text-black text-base">{item?.city}</Text>
                                            </View>
                                            <View className="flex flex-row items-center">
                                                <Text className="text-black text-base">{item?.houseNo}, </Text>
                                                <Text className="text-black text-base">{item?.streetNo}, </Text>
                                                <Text className="text-black text-base">{item?.landMark}</Text>
                                            </View>

                                            <Text className="text-black text-base">MobileNo: {item?.mobileNo}</Text>
                                            <Text className="text-black text-base">Postal code: {item.postalCode}</Text>
                                        </View>
                                    </Pressable>
                                ))
                            ) : (
                                <View>
                                    <Text>No adress found</Text>
                                </View>
                            )
                        }

                        <Pressable
                            onPress={() => {
                                setModalVisible(false)
                                navigation.navigate("AddAddress")
                            }}
                            className="border-gray-300 border-[1px] mr-40 py-11 mt-4 px-4"
                        >
                            <Text className="text-[#2252d6] text-base">Add an Adress</Text>
                            <Text className="text-[#2252d6] text-base ">or a pickup point</Text>
                        </Pressable>
                    </ScrollView>

                    <View className=" mt-4">
                        <TouchableOpacity>
                            <View className="flex flex-row items-center">
                                <EvilIcons name="location" size={30} color="#2252d6" />
                                <Text className="text-[#2252d6] text-base ml-1">Enter a pincode</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>

                            <View className="flex flex-row my-2 items-center">
                                <Ionicons name="locate-sharp" size={30} color="#2252d6" />
                                <Text className="text-[#2252d6] text-base ml-1">Use my location</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>

                            <View className="flex flex-row items-center ">
                                <AntDesign name="earth" size={25} color="#2252d6" />
                                <Text className="text-[#2252d6] text-base ml-2">Deliver outside of Country</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    {/* Add other content for your modal here */}
                </View>
            </Modal >
        </>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {}
});
