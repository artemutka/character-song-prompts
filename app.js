// Импортируем иконки из Lucide
const { Copy, Edit, Check, X, ChevronDown, ChevronUp, RefreshCw } = lucide;

// Основной компонент приложения
const App = () => {
  const [activePrompt, setActivePrompt] = React.useState(null);
  const [editMode, setEditMode] = React.useState(false);
  const [editedPrompt, setEditedPrompt] = React.useState('');
  const [copied, setCopied] = React.useState('');
  const [characterName, setCharacterName] = React.useState('Метал Соник');
  const [expandedSections, setExpandedSections] = React.useState({
    research: true,
    structure: false,
    verses: false,
    chorus: false,
    bridge: false,
    assembly: false,
    testing: false,
  });

  // Все промпты с placeholders для имени персонажа
  const prompts = {
    research: `Опишите ключевые характеристики персонажа [ИМЯ]:
1. Внешний вид (отличительные черты)
2. Особые способности
3. История происхождения
4. Основная мотивация/цель
5. Внутренние конфликты
6. Отношения с другими персонажами
7. Технический/специальный жаргон из вселенной персонажа
8. Самые известные цитаты персонажа
9. Ключевые события, связанные с персонажем`,
    
    structure: `Создайте структуру песни от первого лица для персонажа [ИМЯ] для детской аудитории (8-12 лет). Песня должна:
1. Иметь динамичное начало, отражающее суть персонажа
2. Содержать 3 куплета, каждый с уникальным акцентом:
   - Первый куплет: происхождение и уникальные характеристики
   - Второй куплет: способности и отношения с другими персонажами
   - Третий куплет: цели и достижения
3. Иметь мощный запоминающийся припев с именем персонажа
4. Включать мост с раскрытием внутреннего конфликта
5. Завершаться эпичной кульминацией`,
    
    verses: `Напишите первый куплет песни от лица [ИМЯ]. Включите:
1. Яркие метафоры для описания внешности
2. Современные отсылки, понятные детям (технологии, популярные концепты)
3. Заявление о превосходстве/уникальности персонажа
4. Простые, но запоминающиеся рифмы
5. Язык должен быть понятен целевой аудитории (8-12 лет)
6. Максимум 4 строки`,
    
    verses2: `Напишите второй куплет песни от лица [ИМЯ]. Включите:
1. Описание его ключевых способностей
2. Отношение к другим персонажам вселенной
3. Простые, но запоминающиеся рифмы
4. Современные выражения, понятные детям
5. Максимум 4 строки`,
    
    verses3: `Напишите третий куплет песни от лица [ИМЯ]. Включите:
1. Описание его главных целей или миссии
2. Упоминание его достижений
3. Простые, но запоминающиеся рифмы
4. Элемент триумфа или превосходства
5. Максимум 4 строки`,
    
    chorus: `Создайте несколько вариантов запоминающегося припева для песни о [ИМЯ], где:
1. Первая строка начинается с имени персонажа
2. Вторая строка описывает его главные достижения
3. Третья строка содержит набор из трех качеств/характеристик в формате "Прилагательное, прилагательное, прилагательнее чего-то"
4. Последняя строка утверждает идентичность персонажа "[ИМЯ] — это я!"
5. Ритм должен быть легким для повторения
6. Используйте яркие образы, связанные с персонажем`,
    
    bridge: `Разработайте мост для песни о [ИМЯ], который:
1. Раскрывает внутренний конфликт или сомнения персонажа
2. Начинается с противопоставления "Они говорят — ..., но я..."
3. Упоминает трансформации/изменения персонажа
4. Содержит решительное утверждение цели в последней строке
5. Имеет немного более рефлексивный тон, чем остальная песня`,
    
    assembly: `Объедините все элементы в цельную песню о [ИМЯ]. Добавьте:
1. Инструкции по исполнению в квадратных скобках
2. Звуковые эффекты, соответствующие характеру персонажа
3. Заменители сложных слов на простые аналоги
4. Характерные восклицания персонажа в стратегических местах
5. Проверьте правильные ударения в именах
6. Создайте эффектное завершение с растянутыми слогами
7. Добавьте эмоциональные указания для исполнения каждой части`,
    
    testing: `Проанализируйте созданную песню о [ИМЯ] на предмет:
1. Соответствия образу и характеру персонажа
2. Понятности для целевой аудитории (8-12 лет)
3. Наличия запоминающихся и легко повторяемых фраз
4. Использования актуального сленга и отсылок
5. Энергичности и динамичности
6. Логической последовательности повествования
7. Правильного использования уникальных терминов из вселенной персонажа

Предложите конкретные улучшения для проблемных мест.`
  };

  // Функция для замены плейсхолдера имени
  const replaceCharacterName = (prompt) => {
    return prompt.replace(/\[ИМЯ\]/g, characterName);
  };

  // Обработчик копирования
  const handleCopy = (promptKey) => {
    navigator.clipboard.writeText(replaceCharacterName(prompts[promptKey]));
    setCopied(promptKey);
    setTimeout(() => setCopied(''), 2000);
  };

  // Обработчик начала редактирования
  const handleEdit = (promptKey) => {
    setActivePrompt(promptKey);
    setEditedPrompt(prompts[promptKey]);
    setEditMode(true);
  };

  // Обработчик сохранения
  const handleSave = () => {
    // В этой упрощенной версии просто скрываем модальное окно
    setEditMode(false);
  };

  // Обработчик отмены редактирования
  const handleCancel = () => {
    setEditMode(false);
  };

  // Обработчик переключения разделов
  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section]
    });
  };

  // Компонент блока с промптом
  const PromptBlock = ({ title, description, promptKey, extraContent }) => {
    return (
      <div className="mb-6 border border-gray-200 rounded-lg overflow-hidden">
        <div 
          className="flex justify-between items-center p-4 bg-gray-50 cursor-pointer"
          onClick={() => toggleSection(promptKey)}
        >
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          {expandedSections[promptKey] ? 
            React.createElement(ChevronUp, { size: 20 }) : 
            React.createElement(ChevronDown, { size: 20 })}
        </div>
        
        {expandedSections[promptKey] && (
          <div className="p-4">
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <p className="text-gray-700 mb-2">{description}</p>
            </div>
            
            {extraContent ? extraContent : (
              <div className="border border-gray-200 rounded-lg p-4 bg-white">
                <pre className="whitespace-pre-wrap text-gray-800 mb-4 font-mono text-sm">{replaceCharacterName(prompts[promptKey])}</pre>
                
                <div className="flex justify-end gap-2">
                  <button 
                    className={`px-4 py-2 rounded-lg flex items-center ${copied === promptKey ? 'bg-green-500 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
                    onClick={() => handleCopy(promptKey)}
                  >
                    {copied === promptKey ? 
                      React.createElement("span", {}, [
                        React.createElement(Check, { size: 18, className: "mr-1" }),
                        "Скопировано"
                      ]) : 
                      React.createElement("span", {}, [
                        React.createElement(Copy, { size: 18, className: "mr-1" }),
                        "Копировать"
                      ])}
                  </button>
                  <button 
                    className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg flex items-center"
                    onClick={() => handleEdit(promptKey)}
                  >
                    {React.createElement("span", {}, [
                      React.createElement(Edit, { size: 18, className: "mr-1" }),
                      "Редактировать"
                    ])}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  // Компонент блока с вложенными промптами (для куплетов)
  const VersePromptBlocks = () => {
    return (
      <div className="p-4">
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <p className="text-gray-700 mb-2">Создайте три куплета, каждый с уникальным фокусом: происхождение, способности и цели персонажа.</p>
        </div>
        
        <div className="border border-gray-200 rounded-lg p-4 bg-white mb-4">
          <h3 className="font-semibold mb-2">Первый куплет</h3>
          <pre className="whitespace-pre-wrap text-gray-800 mb-4 font-mono text-sm">{replaceCharacterName(prompts.verses)}</pre>
          
          <div className="flex justify-end gap-2">
            <button 
              className={`px-4 py-2 rounded-lg flex items-center ${copied === 'verses' ? 'bg-green-500 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
              onClick={() => handleCopy('verses')}
            >
              {copied === 'verses' ? 
                React.createElement("span", {}, [
                  React.createElement(Check, { size: 18, className: "mr-1" }),
                  "Скопировано"
                ]) : 
                React.createElement("span", {}, [
                  React.createElement(Copy, { size: 18, className: "mr-1" }),
                  "Копировать"
                ])}
            </button>
            <button 
              className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg flex items-center"
              onClick={() => handleEdit('verses')}
            >
              {React.createElement("span", {}, [
                React.createElement(Edit, { size: 18, className: "mr-1" }),
                "Редактировать"
              ])}
            </button>
          </div>
        </div>
        
        <div className="border border-gray-200 rounded-lg p-4 bg-white mb-4">
          <h3 className="font-semibold mb-2">Второй куплет</h3>
          <pre className="whitespace-pre-wrap text-gray-800 mb-4 font-mono text-sm">{replaceCharacterName(prompts.verses2)}</pre>
          
          <div className="flex justify-end gap-2">
            <button 
              className={`px-4 py-2 rounded-lg flex items-center ${copied === 'verses2' ? 'bg-green-500 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
              onClick={() => handleCopy('verses2')}
            >
              {copied === 'verses2' ? 
                React.createElement("span", {}, [
                  React.createElement(Check, { size: 18, className: "mr-1" }),
                  "Скопировано"
                ]) : 
                React.createElement("span", {}, [
                  React.createElement(Copy, { size: 18, className: "mr-1" }),
                  "Копировать"
                ])}
            </button>
            <button 
              className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg flex items-center"
              onClick={() => handleEdit('verses2')}
            >
              {React.createElement("span", {}, [
                React.createElement(Edit, { size: 18, className: "mr-1" }),
                "Редактировать"
              ])}
            </button>
          </div>
        </div>
        
        <div className="border border-gray-200 rounded-lg p-4 bg-white">
          <h3 className="font-semibold mb-2">Третий куплет</h3>
          <pre className="whitespace-pre-wrap text-gray-800 mb-4 font-mono text-sm">{replaceCharacterName(prompts.verses3)}</pre>
          
          <div className="flex justify-end gap-2">
            <button 
              className={`px-4 py-2 rounded-lg flex items-center ${copied === 'verses3' ? 'bg-green-500 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
              onClick={() => handleCopy('verses3')}
            >
              {copied === 'verses3' ? 
                React.createElement("span", {}, [
                  React.createElement(Check, { size: 18, className: "mr-1" }),
                  "Скопировано"
                ]) : 
                React.createElement("span", {}, [
                  React.createElement(Copy, { size: 18, className: "mr-1" }),
                  "Копировать"
                ])}
            </button>
            <button 
              className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg flex items-center"
              onClick={() => handleEdit('verses3')}
            >
              {React.createElement("span", {}, [
                React.createElement(Edit, { size: 18, className: "mr-1" }),
                "Редактировать"
              ])}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Промпты для создания песен о персонажах</h1>
          
          {/* Форма для имени персонажа */}
          <div className="mb-6 bg-blue-50 p-4 rounded-lg">
            <label className="block text-lg font-medium text-gray-700 mb-2">Имя персонажа:</label>
            <div className="flex gap-2">
              <input 
                type="text" 
                value={characterName} 
                onChange={(e) => setCharacterName(e.target.value)}
                className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Введите имя персонажа"
              />
              <button 
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
                onClick={() => setCharacterName('')}
              >
                {React.createElement("span", {}, [
                  React.createElement(RefreshCw, { size: 18, className: "mr-1" }),
                  "Сбросить"
                ])}
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-2">Имя персонажа автоматически заменяет [ИМЯ] в промптах.</p>
          </div>

          {/* Блоки с промптами */}
          <PromptBlock 
            title="1. Исследование и сбор материала" 
            description="Соберите всю необходимую информацию о персонаже: внешность, способности, историю, мотивацию, конфликты и отношения."
            promptKey="research" 
          />
          
          <PromptBlock 
            title="2. Структура и концепция" 
            description="Определите общую структуру песни, включая куплеты с разными фокусами, припев и мост."
            promptKey="structure" 
          />
          
          <PromptBlock 
            title="3. Создание куплетов" 
            description="Создайте три куплета, каждый с уникальным фокусом: происхождение, способности и цели персонажа."
            promptKey="verses" 
            extraContent={<VersePromptBlocks />}
          />
          
          <PromptBlock 
            title="4. Разработка припева" 
            description="Создайте запоминающийся припев, который начинается с имени персонажа и подчеркивает его уникальные качества."
            promptKey="chorus" 
          />
          
          <PromptBlock 
            title="5. Создание моста" 
            description="Разработайте мост, который раскрывает внутренний конфликт персонажа и показывает его глубину."
            promptKey="bridge" 
          />
          
          <PromptBlock 
            title="6. Финальная сборка и доработка" 
            description="Объедините все элементы в цельную песню с инструкциями по исполнению и эмоциональными указаниями."
            promptKey="assembly" 
          />
          
          <PromptBlock 
            title="7. Тестирование и коррекция" 
            description="Проанализируйте созданную песню на соответствие образу персонажа и понятность для целевой аудитории."
            promptKey="testing" 
          />
        </div>
      </div>

      {/* Информация внизу */}
      <div className="max-w-6xl mx-auto mt-4 text-center text-gray-500 text-sm">
        <p>© 2025 - Универсальные промпты для создания песен о персонажах</p>
        <p className="mt-1">Доступно на <a href="https://github.com/artemutka/character-song-prompts" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">GitHub</a></p>
      </div>

      {/* Модальное окно для редактирования */}
      {editMode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <h2 className="text-2xl font-bold mb-4">Редактирование промпта</h2>
            
            <div className="flex-grow overflow-auto mb-4">
              <textarea 
                value={editedPrompt}
                onChange={(e) => setEditedPrompt(e.target.value)}
                className="w-full h-full min-h-[300px] p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
              />
            </div>
            
            <div className="flex justify-end gap-2">
              <button 
                className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg flex items-center"
                onClick={handleCancel}
              >
                {React.createElement("span", {}, [
                  React.createElement(X, { size: 18, className: "mr-1" }),
                  "Отмена"
                ])}
              </button>
              <button 
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
                onClick={handleSave}
              >
                {React.createElement("span", {}, [
                  React.createElement(Check, { size: 18, className: "mr-1" }),
                  "Сохранить"
                ])}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Рендерим приложение
ReactDOM.render(
  React.createElement(App, null),
  document.getElementById('root')
);