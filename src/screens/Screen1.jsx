import React, { useEffect, useState } from "react";
import {
  Text,
  ScrollView,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import client from "../../api/client";
import AntDesign from "@expo/vector-icons/AntDesign";

export const Screen1 = () => {
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [modalEditVisible, setModalEditVisible] = useState(false);
  const [modalDeleteVisible, setModalDeleteVisible] = useState(false);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const AVATAR_FALLBACK_URL =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-SnDtnoTbs_JJtNW62ALeA4gKPtpCGcQ5CnVEJNNAddxjuLwrbo1c16rExrxYL4xLmIw";

  const fetchUsers = async () => {
    try {
      const response = await client.get("/users");
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const closeModalEdit = () => {
    setModalEditVisible(false);
  };

  const openModalEdit = (user) => {
    setSelectedUser(user);
    setFullname(user.fullname);
    setEmail(user.email);
    setRole(user.role);
    setModalEditVisible(true);
  };

  const editUser = async () =>{
    try{
      const response = await client.patch(`/users/edit/${selectedUser.id}`, {
        fullname,
        email,
        role,
      });

      if (response.status === 200) {
        alert("Se ha modificado al usuario con éxito");
        fetchUsers();
      }
      setModalEditVisible(false);
    } catch(error){
      alert(error);
    }
  }

  const closeModalDelete = () => {
    setModalDeleteVisible(false);
  };

  const deleteUser = async () =>{
    try{
      const response = await client.delete(`/users/remove/${selectedUser.id}`);

      if (response.status === 200) {
        alert("Se ha eliminado al usuario con éxito");
        fetchUsers();
      }
      setModalDeleteVisible(false);
    } catch(error){
      alert(error);
    }
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.listContainer}>
          {users.map((user) => (
            <View key={user.id} style={styles.userItem}>
              <Image
                source={{
                  uri: user.avatar
                    ? `http://192.168.1.8:3001/users/images/${user.avatar}`
                    : AVATAR_FALLBACK_URL,
                }}
                style={{ width: 50, height: 50, borderRadius: 25 }}
              />

              <View style={styles.userContent}>
                <Text>{user.fullname}</Text>
                <Text>{` `}</Text>
                <Text>{user.email}</Text>
                <Text>{` `}</Text>
                <Text>{user.role}</Text>
              </View>
              <View style={styles.buttonsContainer}>
                <TouchableOpacity
                  onPress={() => {
                    openModalEdit(user);
                  }}
                >
                  <AntDesign name="edit" size={24} color={"black"} />
                </TouchableOpacity>
                <Text>{` `}</Text>
                <TouchableOpacity
                  onPress={() => {
                    setSelectedUser(user);
                    setModalDeleteVisible(true);
                  }}
                >
                  <AntDesign name="delete" size={24} color={"black"} />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalEditVisible}
        onRequestClose={() => {
          setModalEditVisible(!modalEditVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.title}>Editar</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Nombre del usuario:"
                placeholderTextColor="#FFFFFF"
                value={fullname}
                onChangeText={(text) => setFullname(text)}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Email del usuario:"
                placeholderTextColor="#FFFFFF"
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Rol del usuario:"
                placeholderTextColor="#FFFFFF"
                value={role}
                onChangeText={(text) => setRole(text)}
              />
            </View>
            <View style={styles.ModalButtonsContainer}>
              <TouchableOpacity
                style={styles.buttonModal}
                onPress={editUser}
              >
                <Text>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonModal}
                onPress={closeModalEdit}
              >
                <Text>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalDeleteVisible}
        onRequestClose={() => {
          setModalDeleteVisible(!modalDeleteVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Seguro quiere eliminar al usuario:
            </Text>
            <Text style={styles.modalText}>{selectedUser.fullname}</Text>
            <View style={styles.ModalButtonsContainer}>
              <TouchableOpacity
                style={styles.buttonModal}
                onPress={deleteUser}
              >
                <Text>Eliminar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonModal}
                onPress={closeModalDelete}
              >
                <Text>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 70,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  listContainer: {
    flex: 1,
    width: "100%",
  },
  userItem: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    backgroundColor: "#f8f7f7",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  userContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "#2B2B2B",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: "#FFFFFF",
  },
  buttonModal: {
    marginTop: 20,
    marginHorizontal: 10,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: "#0074E4",
  },
  ModalButtonsContainer: {
    flexDirection: "row",
  },
  inputContainer: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#FFFFFF",
    borderRadius: 10,
    padding: 10,
    width: 295,
    height: 45,
    justifyContent: "center",
    alignItems: "start",
  },
  input: {
    color: "#FFFFFF",
    flex: 1,
    textAlign: "left",
  },
  title: {
    color: "#FFFFFF",
    fontSize: 22,
    marginTop: 10,
    fontWeight: "bold",
  },
});
