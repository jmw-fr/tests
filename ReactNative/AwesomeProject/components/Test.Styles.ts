import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
    main_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    subview_container:
        Platform.select({
            ios: {
                backgroundColor: 'red',
                height: 100,
                width: 50
            },
            android: {
                backgroundColor: 'blue',
                height: 50,
                width: 100
            }
        })
});
