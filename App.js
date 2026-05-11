import { StyleSheet, Text, View, Image, ImageBackground } from "react-native";
import GameCard from "./components/GameCard";
import dados from "./assets/dados.json";
import { SectionList } from "react-native";

export default function App() {

  const jogos = dados.jogos;

  // data de hoje no mesmo formato do seu JSON (pt-BR)
  const hoje = new Date().toLocaleDateString("pt-BR");

  // agrupa por data
  const agruparPorData = (jogos) => {

    const agrupados = jogos.reduce((acc, jogo) => {

      const data = jogo.data_brasilia;

      if (!acc[data]) {
        acc[data] = [];
      }

      acc[data].push(jogo);

      return acc;

    }, {});

    // ordena por hora dentro de cada dia
    Object.keys(agrupados).forEach((data) => {

      agrupados[data].sort((a, b) => {

        const [horaA, minutoA] = a.hora_brasilia.split(":");
        const [horaB, minutoB] = b.hora_brasilia.split(":");

        const totalA = Number(horaA) * 60 + Number(minutoA);
        const totalB = Number(horaB) * 60 + Number(minutoB);

        return totalA - totalB;

      });

    });

    return agrupados;
  };

  const jogosAgrupados = agruparPorData(jogos);

  const jogosTratados = Object.keys(jogosAgrupados).map((data) => {
    return {
      title: data,
      data: jogosAgrupados[data],
    };
  });

  return (
    <ImageBackground
      style={styles.container}
      source={require("./assets/bg-overlay.png")}
    >

      <Image
        style={styles.logo}
        source={require("./assets/unicopa.png")}
      />

      <Text style={styles.title}>CALENDÁRIO</Text>

      <SectionList
        sections={jogosTratados}
        keyExtractor={(item, index) => item.id?.toString() + index}

        renderItem={() => null}

        renderSectionHeader={({ section }) => {

          const isHoje = section.title === hoje;

          return (
            <View
              style={[
                styles.card,
                isHoje && styles.cardHoje
              ]}
            >

              <Text
                style={[
                  styles.data,
                  isHoje && styles.dataHoje
                ]}
              >
                {section.title}
              </Text>

              {section.data.map((jogo) => (
                <GameCard
                  key={jogo.id}
                  game={jogo}
                />
              ))}

            </View>
          );
        }}
      />

    </ImageBackground>
  );
}

const styles = StyleSheet.create({

  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "#040b13",
    alignItems: "center",
  },

  logo: {
    marginTop: 20,
    width: 200,
    height: 50,
    resizeMode: "contain",
  },

  title: {
    marginTop: 10,
    fontSize: 28,
    fontWeight: "700",
    color: "white",
  },

  card: {
    marginTop: 20,
    backgroundColor: "#0c1b2a",
    width: 320,
    borderRadius: 12,
    padding: 15,
  },

  // destaque do dia atual
  cardHoje: {
    borderWidth: 2,
    borderColor: "#f2cc2f",
    backgroundColor: "#132235",
  },

  data: {
    color: "#f2cc2f",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },

  // destaque do texto HOJE
  dataHoje: {
    color: "#00ff88",
  },
});