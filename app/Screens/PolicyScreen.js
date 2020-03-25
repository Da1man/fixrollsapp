import React, {PureComponent} from 'react';
import {StyleSheet, Text, View, ScrollView, TouchableOpacity} from 'react-native';

import Header from '../components/Header';
import {THEME, w} from '../common/variables';

import {connect} from 'react-redux';

class PolicyScreen extends PureComponent {

  componentDidMount() {
  }

  render() {
    const {navigation} = this.props;
    return (
      <View style={{flex: 1}}>
        <Header backButton={true} navigation={navigation} title={'Политика ПД'}/>
        <ScrollView
          style={styles.container}
        >

          <View style={styles.titleSection}>
            <Text style={styles.titleText}>ПОЛИТИКА В ОТНОШЕНИИ ОБРАБОТКИ ПЕРСОНАЛЬНЫХ ДАННЫХ</Text>
          </View>

          <View style={styles.subtitleSection}>
            <Text style={styles.subtitleText}>1. ОБЩИЕ ПОЛОЖЕНИЯ</Text>
          </View>
          <View style={styles.paragraphSection}>
            <Text style={styles.paragraphText}>
              Настоящая политика обработки персональных данных составлена в соответствии с
              требованиями Федерального закона от 27.07.2006. №152-ФЗ «О персональных данных»
              и определяет порядок обработки персональных данных и меры по обеспечению безопасности
              персональных данных ООО «Фикс Ролс» (далее – Оператор).
            </Text>
            <Text style={styles.paragraphText}>
              1.1. Оператор ставит своей важнейшей целью и условием осуществления своей деятельности
              соблюдение прав и свобод человека и гражданина при обработке его персональных данных,
              в том числе защиты прав на неприкосновенность частной жизни, личную и семейную тайну.
            </Text>
            <Text style={styles.paragraphText}>
              1.2. Настоящая политика Оператора в отношении обработки персональных данных (далее – Политика)
              применяется ко всей информации, которую Оператор может получить о посетителях веб-сайта
              https://fixrolls.ru/.
            </Text>
          </View>


          <View style={styles.subtitleSection}>
            <Text style={styles.subtitleText}>2. ОСНОВНЫЕ ПОНЯТИЯ, ИСПОЛЬЗУЕМЫЕ В ПОЛИТИКЕ</Text>
          </View>
          <View style={styles.paragraphSection}>
            <Text style={styles.paragraphText}>
              2.1. Автоматизированная обработка персональных данных – обработка персональных данных с
              помощью средств вычислительной техники;
            </Text>
            <Text style={styles.paragraphText}>
              2.2. Блокирование персональных данных – временное прекращение обработки персональных
              данных (за исключением случаев, если обработка необходима для уточнения персональных данных);
            </Text>
            <Text style={styles.paragraphText}>
              2.3. Веб-сайт – совокупность графических и информационных материалов, а также программ для ЭВМ
              и баз данных, обеспечивающих их доступность в сети интернет по сетевому адресу https://fixrolls.ru/;
            </Text>
            <Text style={styles.paragraphText}>
              2.4. Информационная система персональных данных — совокупность содержащихся в базах данных персональных
              данных, и обеспечивающих их обработку информационных технологий и технических средств;
            </Text>
            <Text style={styles.paragraphText}>
              2.5. Обезличивание персональных данных — действия, в результате которых невозможно определить без
              использования дополнительной информации принадлежность персональных данных конкретному Пользователю
              или иному субъекту персональных данных;
            </Text>
            <Text style={styles.paragraphText}>
              2.6. Обработка персональных данных – любое действие (операция) или совокупность действий (операций),
              совершаемых с использованием средств автоматизации или без использования таких средств с персональными
              данными, включая сбор, запись, систематизацию, накопление, хранение, уточнение (обновление, изменение),
              извлечение, использование, передачу (распространение, предоставление, доступ), обезличивание, блокирование,
              удаление, уничтожение персональных данных;
            </Text>
            <Text style={styles.paragraphText}>
              2.7. Оператор – государственный орган, муниципальный орган, юридическое или физическое лицо, самостоятельно
              или совместно с другими лицами организующие и (или) осуществляющие обработку персональных данных, а также
              определяющие цели обработки персональных данных, состав персональных данных, подлежащих обработке, действия
              (операции), совершаемые с персональными данными;
            </Text>
            <Text style={styles.paragraphText}>
              2.8. Персональные данные – любая информация, относящаяся прямо или косвенно к определенному или
              определяемому Пользователю веб-сайта https://fixrolls.ru/;
            </Text>
            <Text style={styles.paragraphText}>
              2.9. Пользователь – любой посетитель веб-сайта https://fixrolls.ru/;
            </Text>
            <Text style={styles.paragraphText}>
              2.10. Предоставление персональных данных – действия, направленные на раскрытие персональных данных
              определенному лицу или определенному кругу лиц;
            </Text>
            <Text style={styles.paragraphText}>
              2.11. Распространение персональных данных – любые действия, направленные на раскрытие персональных
              данных неопределенному кругу лиц (передача персональных данных) или на ознакомление с персональными
              данными неограниченного круга лиц, в том числе обнародование персональных данных в средствах массовой
              информации, размещение в информационно-телекоммуникационных сетях или предоставление доступа к
              персональным данным каким-либо иным способом;
            </Text>
            <Text style={styles.paragraphText}>
              2.12. Трансграничная передача персональных данных – передача персональных данных на территорию
              иностранного государства органу власти иностранного государства, иностранному физическому или иностранному
              юридическому лицу;
            </Text>
            <Text style={styles.paragraphText}>
              2.13. Уничтожение персональных данных – любые действия, в результате которых персональные данные
              уничтожаются безвозвратно с невозможностью дальнейшего восстановления содержания персональных данных в
              информационной системе персональных данных и (или) результате которых уничтожаются материальные носители
              персональных данных.
            </Text>
          </View>


          <View style={styles.subtitleSection}>
            <Text style={styles.subtitleText}>
              3. ОПЕРАТОР МОЖЕТ ОБРАБАТЫВАТЬ СЛЕДУЮЩИЕ ПЕРСОНАЛЬНЫЕ ДАННЫЕ ПОЛЬЗОВАТЕЛЯ
            </Text>
          </View>
          <View style={styles.paragraphSection}>
            <Text style={styles.paragraphText}>
              1. Фамилия, имя, отчество;
            </Text>
            <Text style={styles.paragraphText}>
              2. Электронный адрес;
            </Text>
            <Text style={styles.paragraphText}>
              3. Номера телефонов;
            </Text>
            <Text style={styles.paragraphText}>
              4. Также на сайте происходит сбор и обработка обезличенных данных о посетителях (в т.ч. файлов «cookie»)
              с помощью сервисов интернет-статистики (Яндекс Метрика и Гугл Аналитика и других).
            </Text>
            <Text style={styles.paragraphText}>
              5. Вышеперечисленные данные далее по тексту Политики объединены общим понятием Персональные данные.
            </Text>
          </View>


          <View style={styles.subtitleSection}>
            <Text style={styles.subtitleText}>
              4. ЦЕЛИ ОБРАБОТКИ ПЕРСОНАЛЬНЫХ ДАННЫХ
            </Text>
          </View>
          <View style={styles.paragraphSection}>
            <Text style={styles.paragraphText}>
              4.1. Цель обработки персональных данных Пользователя — информирование Пользователя посредством отправки
              электронных писем; предоставление доступа Пользователю к сервисам, информации и/или материалам,
              содержащимся на веб-сайте.
            </Text>
            <Text style={styles.paragraphText}>
              4.2. Также Оператор имеет право направлять Пользователю уведомления о новых продуктах и услугах,
              специальных предложениях и различных событиях. Пользователь всегда может отказаться от получения
              информационных сообщений, направив Оператору письмо на адрес электронной почты fixrolls@yandex.ru с
              пометкой «Отказ от уведомлениях о новых продуктах и услугах и специальных предложениях».
            </Text>
            <Text style={styles.paragraphText}>
              4.3. Обезличенные данные Пользователей, собираемые с помощью сервисов интернет-статистики, служат для
              сбора информации о действиях Пользователей на сайте, улучшения качества сайта и его содержания.
            </Text>
          </View>


          <View style={styles.subtitleSection}>
            <Text style={styles.subtitleText}>
              5. ПРАВОВЫЕ ОСНОВАНИЯ ОБРАБОТКИ ПЕРСОНАЛЬНЫХ ДАННЫХ
            </Text>
          </View>
          <View style={styles.paragraphSection}>
            <Text style={styles.paragraphText}>
              5.1. Оператор обрабатывает персональные данные Пользователя только в случае их заполнения и/или отправки
              Пользователем самостоятельно через специальные формы, расположенные на сайте https://fixrolls.ru/.
              Заполняя соответствующие формы и/или отправляя свои персональные данные Оператору, Пользователь выражает
              свое согласие с данной Политикой.
            </Text>
            <Text style={styles.paragraphText}>
              5.2. Оператор обрабатывает обезличенные данные о Пользователе в случае, если это разрешено в настройках
              браузера Пользователя (включено сохранение файлов «cookie» и использование технологии JavaScript).
            </Text>
          </View>


          <View style={styles.subtitleSection}>
            <Text style={styles.subtitleText}>
              6. ПОРЯДОК СБОРА, ХРАНЕНИЯ, ПЕРЕДАЧИ И ДРУГИХ ВИДОВ ОБРАБОТКИ ПЕРСОНАЛЬНЫХ ДАННЫХ
            </Text>
          </View>
          <View style={styles.paragraphSection}>
            <Text style={styles.paragraphText}>
              Безопасность персональных данных, которые обрабатываются Оператором, обеспечивается путем реализации
              правовых, организационных и технических мер, необходимых для выполнения в полном объеме требований
              действующего законодательства в области защиты персональных данных.
            </Text>
            <Text style={styles.paragraphText}>
              6.1. Оператор обеспечивает сохранность персональных данных и принимает все возможные меры, исключающие
              доступ к персональным данным неуполномоченных лиц.
            </Text>
            <Text style={styles.paragraphText}>
              6.2. Персональные данные Пользователя никогда, ни при каких условиях не будут переданы третьим лицам,
              за исключением случаев, связанных с исполнением действующего законодательства.
            </Text>
            <Text style={styles.paragraphText}>
              6.3. В случае выявления неточностей в персональных данных, Пользователь может актуализировать их
              самостоятельно, путем направления Оператору уведомление на адрес электронной почты Оператора
              fixrolls@yandex.ru с пометкой «Актуализация персональных данных».
            </Text>
            <Text style={styles.paragraphText}>
              6.4. Срок обработки персональных данных является неограниченным. Пользователь может в любой момент
              отозвать свое согласие на обработку персональных данных, направив Оператору уведомление посредством
              электронной почты на электронный адрес Оператора fixrolls@yandex.ru с пометкой «Отзыв согласия на
              обработку персональных данных».
            </Text>
          </View>


          <View style={styles.subtitleSection}>
            <Text style={styles.subtitleText}>
              7. ТРАНСГРАНИЧНАЯ ПЕРЕДАЧА ПЕРСОНАЛЬНЫХ ДАННЫХ
            </Text>
          </View>
          <View style={styles.paragraphSection}>
            <Text style={styles.paragraphText}>
              7.1. Оператор до начала осуществления трансграничной передачи персональных данных обязан убедиться в
              том, что иностранным государством, на территорию которого предполагается осуществлять передачу
              персональных данных, обеспечивается надежная защита прав субъектов персональных данных.
            </Text>
            <Text style={styles.paragraphText}>
              7.2. Трансграничная передача персональных данных на территории иностранных государств, не отвечающих
              вышеуказанным требованиям, может осуществляться только в случае наличия согласия в письменной форме
              субъекта персональных данных на трансграничную передачу его персональных данных и/или исполнения договора,
              стороной которого является субъект персональных данных.
            </Text>
          </View>


          <View style={styles.subtitleSection}>
            <Text style={styles.subtitleText}>
              8. ЗАКЛЮЧИТЕЛЬНЫЕ ПОЛОЖЕНИЯ
            </Text>
          </View>
          <View style={styles.paragraphSection}>
            <Text style={styles.paragraphText}>
              8.1. Пользователь может получить любые разъяснения по интересующим вопросам, касающимся обработки его
              персональных данных, обратившись к Оператору с помощью электронной почты fixrolls@yandex.ru.
            </Text>
            <Text style={styles.paragraphText}>
              8.2. В данном документе будут отражены любые изменения политики обработки персональных данных Оператором.
              Политика действует бессрочно до замены ее новой версией.
            </Text>
            <Text style={styles.paragraphText}>
              8.3. Актуальная версия Политики в свободном доступе расположена в сети Интернет по адресу
              https://fixrolls.ru/privacy-policy-2.
            </Text>
          </View>


          <View style={styles.backButtonSection}>
            <TouchableOpacity
              style={styles.backButton}
              activeOpacity={THEME.SETTINGS.ACTIVE_OPACITY}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.backButtonText}>
                ВЕРНУТЬСЯ НАЗАД
              </Text>
            </TouchableOpacity>
          </View>



        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: THEME.COLOR.WHITE_BACKGROUND,
    flex: 1,
    // height: '100%',
  },
  titleSection: {
    marginTop: 20,
    marginBottom: 40,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderLeftWidth: 5,
    borderLeftColor: THEME.COLOR.ACCENT,
  },
  titleText: {
    fontFamily: THEME.FONT_FAMILY.BOLD,
    fontSize: THEME.FONT_SIZE.TITLE,
    color: THEME.COLOR.BLACK,
  },
  subtitleSection: {
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  subtitleText: {
    fontFamily: THEME.FONT_FAMILY.REGULAR,
    fontSize: THEME.FONT_SIZE.TITLE,
    color: THEME.COLOR.BLACK,
  },
  paragraphSection: {
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  paragraphText: {
    marginBottom: 10,
    fontFamily: THEME.FONT_FAMILY.REGULAR,
    fontSize: THEME.FONT_SIZE.MAIN,
    color: THEME.COLOR.BLACK,
  },
  backButtonSection: {
    paddingHorizontal: 30,
    marginBottom: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    height: 60,
    width: w * 0.7,
    borderColor: THEME.COLOR.GRAY_DARK,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  backButtonText: {
    fontFamily: THEME.FONT_FAMILY.REGULAR,
    fontSize: THEME.FONT_SIZE.TITLE,
    color: THEME.COLOR.GRAY_DARK,
  },
});

let mapStateToProps = state => {
  return {
  };
};

export default connect(mapStateToProps, {})(PolicyScreen);
