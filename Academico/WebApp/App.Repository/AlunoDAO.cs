using App.Domain;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace App.Repository
{
    public class AlunoDAO
    {
        private string stringConexao = ConfigurationManager.ConnectionStrings["ConexaoDev"].ConnectionString;
        private IDbConnection conexao;
        public AlunoDAO()
        {
            conexao= new SqlConnection(stringConexao);
            conexao.Open();
        }
        public List<AlunoDTO> ListarAlunosDB(int? id)
        {
            var listaAlunos = new List<AlunoDTO>();
            try
            {
                IDbCommand selectCmd = conexao.CreateCommand();
                if (id == null)
                {
                    selectCmd.CommandText = "Select * from Alunos";
                }
                else
                {
                    selectCmd.CommandText = $"Select * from Alunos where Id = {id}";
                }

                IDataReader resultado = selectCmd.ExecuteReader();
                while (resultado.Read())
                {
                    var alu = new AlunoDTO()
                    {
                        id = Convert.ToInt32(resultado["Id"]),
                        nome = Convert.ToString(resultado["nome"]),
                        sobrenome = Convert.ToString(resultado["sobrenome"]),
                        telefone = Convert.ToString(resultado["telefone"]),
                        ra = Convert.ToInt32(resultado["ra"]),
                    };
                    listaAlunos.Add(alu);
                }
                   return listaAlunos;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                conexao.Close();
            } 
            
        }
        public void InserirAlunoDB(AlunoDTO aluno)
        {
            try
            {
                IDbCommand insertCmd = conexao.CreateCommand();
                insertCmd.CommandText = "insert into Alunos (nome, sobrenome, telefone, ra) values (@nome, @sobrenome, @telefone, @ra)";

                IDbDataParameter paramNome = new SqlParameter("nome", aluno.nome);
                insertCmd.Parameters.Add(paramNome);

                IDbDataParameter paramSobreNome = new SqlParameter("sobrenome", aluno.sobrenome);
                insertCmd.Parameters.Add(paramSobreNome);

                IDbDataParameter paramTelefone = new SqlParameter("telefone", aluno.telefone);
                insertCmd.Parameters.Add(paramTelefone);

                IDbDataParameter paramRa = new SqlParameter("ra", aluno.ra);
                insertCmd.Parameters.Add(paramRa);

                insertCmd.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                conexao.Close();
            }
        }
        public void AtualizarAlunoDB(AlunoDTO aluno)
        {
            try
            {
                IDbCommand updateCmd = conexao.CreateCommand();
                updateCmd.CommandText = "update Alunos set nome = @nome, sobrenome =@sobrenome, telefone=@telefone, ra=@ra where Id = @id";

                IDbDataParameter paramId = new SqlParameter("id", aluno.id);
                updateCmd.Parameters.Add(paramId);

                IDbDataParameter paramNome = new SqlParameter("nome", aluno.nome);
                updateCmd.Parameters.Add(paramNome);

                IDbDataParameter paramSobreNome = new SqlParameter("sobrenome", aluno.sobrenome);
                updateCmd.Parameters.Add(paramSobreNome);

                IDbDataParameter paramTelefone = new SqlParameter("telefone", aluno.telefone);
                updateCmd.Parameters.Add(paramTelefone);

                IDbDataParameter paramRa = new SqlParameter("ra", aluno.ra);
                updateCmd.Parameters.Add(paramRa);

                updateCmd.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                conexao.Close();
            }
        }

        public void DeletarAlunoDB(int id)
        {
            try
            {
                IDbCommand deleteCmd = conexao.CreateCommand();
                deleteCmd.CommandText = "delete from Alunos where Id = @id";

                IDbDataParameter paramId = new SqlParameter("id", id);
                deleteCmd.Parameters.Add(paramId);

                deleteCmd.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                conexao.Close();
            }
        }
    }
}