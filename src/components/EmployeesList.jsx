import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Button, TextInput } from 'react-native';
import EmployeeItem from './EmployeeItem';
import EmployeeService from '../services/EmployeeService';

function EmployeesList() {
    const [employeesList, setEmployeesList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [companyName, setCompanyName] = useState('');
    const [results, setResults] = useState(5);
    const [bs, setBs] = useState('Technology');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await EmployeeService.getAllEmployees(companyName);
                setEmployeesList(data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, [companyName, bs, results]);

    const filterEmployees = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await EmployeeService.getAllEmployees(companyName, bs, results);
            setEmployeesList(data);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Error: {error.message}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Company Name"
                value={companyName}
                onChangeText={text => setCompanyName(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Results"
                value={results.toString()}
                onChangeText={text => setResults(parseInt(text) || 0)}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Business Type (bs)"
                value={bs}
                onChangeText={text => setBs(text)}
            />
            <Button
                title="Filter"
                color="#886fe3"
                onPress={filterEmployees}
            />

            <View
                style={styles.separator}
            />

            <FlatList
                data={employeesList}
                ItemSeparatorComponent={() => (
                    <View
                        style={styles.separator}
                    />
                )}
                renderItem={({ item: employee }) => (
                    <View>
                        <EmployeeItem employee={employee} />
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5fd',
    },
    input: {
        height: 40,
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
        borderColor: '#dddbf9',
    },
    separator: {
        borderBottomColor: '#c4bef4',
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 10,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#472c86',
    },
    errorText: {
        fontSize: 20,
        color: 'white',
    },
});

export default EmployeesList;
