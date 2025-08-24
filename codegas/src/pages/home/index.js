import React, { useEffect, useContext, useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import Footer from '../components/footer';
import { getVehiculos } from '../../redux/actions/vehiculoActions';
import { getPedidos } from '../../redux/actions/pedidoActions';
import { DataContext } from '../../context/context';
import { style } from './style';

// Importa imágenes una sola vez (optimización)
import iconPedido from '../../assets/img/pg2/bot02.png';
import iconChat from '../../assets/img/pg2/bot03.png';
import fondoUsuarios from '../../assets/img/pg2/bot01.png';
import fondoMain from '../../assets/img/pg1/fondo.jpg';

const Home = ({ navigation }) => {
  const { login, acceso, userId } = useContext(DataContext);
  const [usuariosEntrando, setUsuariosEntrando] = useState([]);
  const [modal, setModal] = useState(false);

  const limit = acceso === 'conductor' ? 50 : 10;
  const dispatch = useDispatch();

  // Carga de datos
  useEffect(() => {
    dispatch(getVehiculos(30));
    dispatch(getPedidos(userId, 0, limit, acceso, undefined));
  }, [dispatch, userId, acceso, limit]);

  // Renderiza botones
  const renderBotones = useCallback(() => (
    <View>
      <TouchableOpacity
        style={[style.btn, { marginTop: 10 }]}
        onPress={() => navigation.navigate(userId ? 'nuevo_pedido' : 'perfil')}
      >
        <Image source={iconPedido} style={style.icon} />
        <Text style={style.text}>NUEVO PEDIDO</Text>
      </TouchableOpacity>

      {acceso === 'cliente' && (
        <TouchableOpacity
          style={[style.btn, { marginTop: 10 }]}
          onPress={() => navigation.navigate('chart')}
        >
          <Image source={iconPedido} style={style.icon} />
          <Text style={style.text}>INFORMES</Text>
        </TouchableOpacity>
      )}

      {acceso !== 'pedidos' && (
        <TouchableOpacity
          style={style.btn}
          onPress={() => {
            if (acceso === 'admin' || acceso === 'solucion') {
              navigation.navigate('conversacion', { /* tokenPhone, acceso */ });
            } else {
              // aquí deberías definir formularioChat
              // de momento mostramos modal
              setModal(true);
            }
          }}
        >
          <Image source={iconChat} style={style.icon} />
          <Text style={style.text}>CHAT</Text>
        </TouchableOpacity>
      )}
    </View>
  ), [navigation, acceso, userId]);

  // Renderiza usuarios en espera
  const renderBtnUsuarios = useCallback(() => (
    <ImageBackground
      style={style.fondoOnline}
      source={fondoUsuarios}
      resizeMode="contain"
    >
      <TouchableOpacity
        style={style.btnUsuariosOnline}
        onPress={usuariosEntrando.length === 0 ? null : () => console.log("crearConversacion()")}
      >
        <Text style={style.textUsuariosOnline}>
          Hay {usuariosEntrando.length} Usuarios en espera
        </Text>
      </TouchableOpacity>
    </ImageBackground>
  ), [usuariosEntrando]);

  return (
    <ImageBackground style={style.container} source={fondoMain}>
      {renderBotones()}
      {renderBtnUsuarios()}
      <View style={style.contenedorColores}>
        {[
          { color: 'rgba(91, 192, 222, 0.79)', label: 'Pedido en espera' },
          { color: 'rgba(255, 235, 0, 0.79)', label: 'Pedido activo' },
          { color: 'rgba(240, 173, 78, 0.79)', label: 'Pedido asignado' },
          { color: 'rgba(92, 184, 92, 0.79)', label: 'Pedido entregado' },
          { color: '#ffffff', label: 'Pedido no entregado' },
          { color: 'rgba(217, 83, 79, 0.79)', label: 'Pedido inactivo' },
        ].map((item, idx) => (
          <View key={idx} style={style.subContenedorColor}>
            <View style={[style.color, { backgroundColor: item.color }]} />
            <Text style={style.textColor}>{item.label}</Text>
          </View>
        ))}
      </View>
      <Footer navigation={navigation} />
    </ImageBackground>
  );
};
export default Home;