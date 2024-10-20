import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OrientationLocker, PORTRAIT } from "react-native-orientation-locker";


import data from './data';
import styles from './homeStyles';

import RankScreen from './childPages/rank/rank';
import AnnouncementScreen from './childPages/announcement';
import ActivityScreen from './childPages/activity/activity';
import DrivePage from './childPages/drive/drive';
import ChargePage from '../../components/charge/charge'

import rankIcon from './images/rank.png';
import aboutUsIcon from './images/about_us.png';
import announcementIcon from './images/announcement.png';
import coinIcon from './images/coin.png';
import carIcon from './images/car.png';

function TopBar({ userCoins, navigation }) {
    return (
        <View style={styles.topBar}>
            <Image source={coinIcon} style={styles.topBarCarIcon} />
            <Text onPress={() => navigation.navigate('Charge')} style={styles.topBarText}>我的金币: {userCoins}</Text>
        </View>
    )
}

function Header({ noticeContext, navigation }) {
    return (
        <View style={styles.header}>
            <View style={styles.headerContainer}>
                <View style={styles.headerItem}>
                    <TouchableOpacity style={styles.headerIconContainerGreen} onPress={() => navigation.navigate('Rank')}>
                        <Image source={rankIcon} style={styles.headerIcon} />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>排行榜</Text>
                </View>
                <View style={styles.headerItem}>
                    <TouchableOpacity style={styles.headerIconContainerRed} onPress={() => navigation.navigate('Charge')}>
                        <Image source={aboutUsIcon} style={styles.headerIcon} />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>商城</Text>
                </View>
                <View style={styles.headerItem}>
                    <TouchableOpacity style={styles.headerIconContainerYellow} onPress={() => navigation.navigate('Announcement')}>
                        <Image source={announcementIcon} style={styles.headerIcon} />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>公告</Text>
                </View>
            </View>
            <View style={styles.announcementContainer}>
                <Text style={styles.announcementText} onPress={() => navigation.navigate('Announcement')}>{noticeContext}</Text>
            </View>
        </View>
    )
};

function ActivityCard({ activityInfo, navigation }) {
    const { eventName, manifacture, onlineNumber, driveNumber } = { ...activityInfo };
    const freeNumber = onlineNumber - driveNumber

    return (
        <View style={styles.cardContainer}>
            <View style={styles.cardHeader}>
                <Text style={styles.statusBadge}>营业中</Text>
                <Text style={styles.eventTitle}>{eventName}</Text>
                <Text style={styles.recommendBadge}>推荐</Text>
            </View>

            <View style={styles.cardContent}>
                <View style={styles.carImageInfo}>
                    <Image source={carIcon} style={styles.carImage} />
                    <Text style={styles.manifactureText}>{manifacture}</Text>
                </View>
                <View style={styles.carDetails}>
                    <Text style={styles.queueText}>空闲车辆 <Text style={freeNumber > 5 ? styles.boldTextGreen : styles.boldTextRed}>{freeNumber}</Text> 辆</Text>
                    <View style={styles.carStatus}>
                        <Text style={styles.normalText}>在线车辆 {onlineNumber} 辆</Text>
                        <Text style={styles.normalText}>驾驶中 {driveNumber} 辆</Text>
                    </View>
                    <TouchableOpacity style={styles.driveButton} onPress={() => navigation.navigate('Activity', { ActivityInfo: activityInfo })} >
                        <Text style={styles.driveButtonText}>{driveNumber} 人正在驾驶</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
};


function HomePage({ navigation }) {
    return (
        <>
            <OrientationLocker orientation={PORTRAIT} />
            <TopBar userCoins={data.userCoins} navigation={navigation} />
            <View style={styles.container}>
                <Header noticeContext={data.noticeContext} navigation={navigation} />
                <FlatList
                    data={data.activityInfoArray}
                    renderItem={({ item }) => <ActivityCard activityInfo={item} navigation={navigation} />}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        </>
    );
}

const HomeStack = createNativeStackNavigator();
export default function Home({ navigation, route }) {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="Home" component={HomePage} options={{ headerShown: false }} />
            <HomeStack.Screen name="Rank" component={RankScreen} options={{ headerShown: false }} />
            <HomeStack.Screen name="Charge" component={ChargePage} options={{ headerShown: false }} />
            <HomeStack.Screen name="Announcement" component={AnnouncementScreen} options={{ headerShown: false }} />
            <HomeStack.Screen name="Activity" component={ActivityScreen} options={{ headerShown: false }} />
            <HomeStack.Screen name="Drive" component={DrivePage} options={{ headerShown: false }} />
        </HomeStack.Navigator>
    );
}

