import React from 'react';
import { View } from 'react-native';

import HelloWorld from './HelloWorld';
import styles from './Test.Styles';

class Test extends React.Component {
    
    render(): JSX.Element {
        return (
            <View style={styles.main_container}>
                {/* <View style={styles.subview_container} /> */}
                <HelloWorld />
            </View>
        )
    }
}

export default Test;