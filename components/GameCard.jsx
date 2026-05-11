import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import teams from "../assets/teams";

export default function GameCard({ game, favoritos, onToggleFavorito }) {

  const logoCasa = teams[game.sigla_casa];
  const logoFora = teams[game.sigla_fora];

  const isFavorito = favoritos?.some((j) => j.id === game.id);

  const isBrasil =
    game.sigla_casa === "BRA" ||
    game.sigla_fora === "BRA";

  return (
    <TouchableOpacity
      onPress={() => onToggleFavorito(game)}
      activeOpacity={0.8}
    >
      <View style={[
        styles.jogo,
        isBrasil && styles.jogoBrasil,
        isFavorito && styles.jogoFavorito
      ]}>

        {/* estrela */}
        <Text style={styles.star}>
          {isFavorito ? "⭐" : "☆"}
        </Text>

        <Text style={styles.grupo}>
          GRUPO {game.grupo} • {game.confronto}
        </Text>

        <View style={styles.linhaPrincipal}>

          <View style={styles.time}>
            <Image style={styles.bandeira} source={logoCasa} />
            <Text style={styles.sigla}>{game.sigla_casa}</Text>
          </View>

          <View style={styles.horario}>
            <Text style={styles.hora}>{game.hora_brasilia}</Text>
            <Text style={styles.subTitulo}>VS</Text>
          </View>

          <View style={styles.time}>
            <Text style={styles.sigla}>{game.sigla_fora}</Text>
            <Image style={styles.bandeira} source={logoFora} />
          </View>

        </View>

        <View style={styles.local}>
          <Text style={styles.subTitulo}>{game.estadio}</Text>
          <Text style={styles.subTitulo}>
            {game.cidade} • {game.pais}
          </Text>
        </View>

      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  jogo: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#1e2d3d",
    paddingBottom: 15,
  },
  
  jogoBrasil: {
    borderWidth: 2,
    borderColor: "#ffd11b",
    backgroundColor: "#044d17",
    borderRadius: 10,
    padding: 10,
  },

  grupo: {
    color: "#8fa3b8",
    fontSize: 12,
    marginBottom: 10,
  },

  linhaPrincipal: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  time: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  bandeira: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },

  sigla: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },

  horario: {
    alignItems: "center",
  },

  hora: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

  local: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  subTitulo: {
    color: "#8fa3b8",
    fontSize: 12,
  },

  jogoFavorito: {
  borderWidth: 40,
  borderColor: "#ffcc00",
},

star: {
  position: "absolute",
  right: 80,
  top: 10,
  color: "#ffcc00",
  fontSize: 25
},
});