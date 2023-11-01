import { View, Image, Text, StyleSheet } from "react-native"


const EmployeeItem = ({ employee }) => (
    <View style={styles.card}>
        <View style={styles.header}>
            <Image source={require('../../assets/user.png')} style={styles.avatar}></Image>
            <Text style={styles.name}>
                {employee.firstname} {employee.lastname}
            </Text>
            <Text style={styles.email}>{employee.email}</Text>
        </View>
        <View style={styles.details}>
            <Text style={styles.label}>Fecha de Nacimiento:</Text>
            <Text>{employee.birthDate}</Text>
            <Text style={styles.label}>Dirección:</Text>
            <Text>{employee.address.street}, {employee.address.suite}, {employee.address.city}, {employee.address.zipcode}</Text>
            <Text style={styles.label}>Teléfono:</Text>
            <Text>{employee.phone}</Text>
            <Text style={styles.label}>Sitio web:</Text>
            <Text>{employee.website}</Text>
            <Text style={styles.label}>Compañía:</Text>
            <Text>{employee.company.name}</Text>
        </View>
    </View>
)

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        margin: 10,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 3,
    },
    header: {
        alignItems: 'center',
        marginBottom: 10,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    email: {
        color: 'gray',
    },
    details: {},
    label: {
        fontWeight: 'bold',
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
});

export default EmployeeItem

