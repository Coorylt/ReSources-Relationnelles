import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 15,
        backgroundColor: '#fff',
        borderRadius:20,
        margin:15
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    searchBar: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 15,
        paddingLeft: 10,
        marginBottom: 20,
    },
    filtersButton: {
        borderColor: '#ccc',
        width:'25%',
        borderWidth: 1,
        padding: 10,
        borderRadius: 20,
        alignItems: 'center',
        marginBottom: 20,
    },
    filtersButtonText: {
        fontSize: 16,
    },
    filtersContainer: {
        marginBottom: 20,
    },
    dropdownContainer: {
        marginBottom: 10,
    },
    dropdownHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
    },
    filterLabel: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    filterValue: {
        fontSize: 16,
    },
    dropdownList: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginTop: 5,
    },
    dropdownOption: {
        padding: 10,
    },
    dropdownOptionText: {
        fontSize: 16,
    },
    searchButton: {
        backgroundColor: '#03989E',
        padding: 10,
        borderRadius: 15,
        alignItems: 'center',
    },
    searchButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});
